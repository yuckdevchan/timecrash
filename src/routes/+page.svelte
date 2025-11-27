<script lang="ts">
  import { setContext } from "svelte";

  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import * as Resizable from "$lib/components/ui/resizable/index.js";
  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";

  import CommandRunner from "$lib/components/timecrash/CommandRunner.svelte";
  import TopBar from "$lib/components/timecrash/TopBar.svelte";
  import AddTrackPopoverContent from "$lib/components/timecrash/AddTrackPopoverContent.svelte";
  import ViewAndPlaybackOptionsPopoverContent from "$lib/components/timecrash/ViewAndPlaybackOptionsPopoverContent.svelte";
  import NoTracks from "$lib/components/timecrash/NoTracks.svelte";
  import Timeline from "$lib/components/timecrash/Timeline.svelte";
  import TrackControlBox from "$lib/components/timecrash/TrackControlBox.svelte";
  import TrackClipArea from "$lib/components/timecrash/TrackClipArea.svelte";
  import MediaPool from "$lib/components/timecrash/MediaPool.svelte";
  import BottomBar from "$lib/components/timecrash/BottomBar.svelte";
  import ProjectTabBar from "$lib/components/timecrash/ProjectTabBar.svelte";
  import ColorPicker from "$lib/components/timecrash/ColorPicker.svelte";
  import Settings from "$lib/components/timecrash/Settings.svelte";
  import Ruler from "$lib/components/timecrash/Ruler.svelte";

  import {
    projects as projectsInit,
    defaultProjectName,
    firstProjectId,
    projectTemplates,
    trackTemplates,
  } from "$lib/";

  import type {
    TrackLike,
    TrackType,
    MediaItem,
    CommandLike,
    Client,
  } from "$lib/index.d.ts";

  import { Plus, Settings2 } from "@lucide/svelte";

  let projects = $state(projectsInit);
  let selectedProjectId = $state(firstProjectId);
  let project = $state(projects[selectedProjectId]);
  let tracks = $state<TrackLike[]>(project.tracks);
  let playhead = $state(project.playhead);
  let bpm = $state(project.bpm);
  let timeSignature = $state(project.timeSignature);
  let baseTrackHeight = $state(project.baseTrackHeight);
  let baseTrackType = $state(project.baseTrackType);
  let baseTrackAddAmount = $state(project.baseTrackAddAmount);
  let timelineLength = $state(project.timelineLength);
  let trackCount = $derived(tracks.length);

  let mediaPool = $state([]);
  let commands: Record<string, CommandLike> = $state({});
  let openClients: Record<string, Client> = $state({});
  setContext("openClients", openClients);

  $effect(() => {
    if (selectedProjectId) {
      project = projects[selectedProjectId];
      tracks = project.tracks;
      playhead = project.playhead;
      bpm = project.bpm;
      timeSignature = project.timeSignature;
      baseTrackHeight = project.baseTrackHeight;
      baseTrackAddAmount = project.baseTrackAddAmount;
      timelineLength = project.timelineLength;
    }
  });

  $effect(() => {
    playhead.exists = trackCount <= 0 ? false : true;
  });

  let showDeleteContextMenu = $state(false);
  let showSaveProjectDialog = $state(false);
  let showProjectConflictDialog = $state(false);
  let showCommandRunner = $state(false);
  let showMediaPool = $state(true);
  let showCreateProjectDialog = $state(false);
  let showSettings = $state(false);
  let trackClipAreaStartX = $state(0);
  let viewScale = $state(25);
  let autoSizeTracks = $state(false);
  let rulerHeight = $state(0);

  let newProjectName = $state("");
  let newProjectTemplate = $state("default");

  function addTracks(
    e: Event | null = null,
    trackTypes: TrackType[] = baseTrackType,
    amount: number = baseTrackAddAmount,
  ) {
    const trackId = crypto.randomUUID();
    for (let trackType of trackTypes) {
      const template = trackTemplates[trackType];
      for (let i = 0; i < amount; i++) {
        const track = { ...template };
        track.id = trackId;
        let a = 0;
        while (true) {
          track.name = `${template.name} ${a + 1}`;
          if (tracks.find((t: TrackLike) => t.name === track.name)) {
            a += 1;
          } else {
            break;
          }
        }
        tracks.push(track);
      }
    }
    return trackId;
  }

  function deleteTrack(index: number) {
    tracks.splice(index, 1);
  }

  function deleteLastTrack() {
    if (!(tracks.length === 0)) {
      tracks.pop();
    }
  }

  function addTrackWithLastTrackType() {
    if (tracks.length === 0) {
      addTracks(null, ["audio"], 1);
    } else {
      const lastTrack = tracks[tracks.length - 1];
      addTracks(null, [lastTrack.type], 1);
    }
  }

  function soloTrack(index: number) {
    tracks[index].soloMute = tracks[index].soloMute.includes("solo")
      ? tracks[index].soloMute.filter((v: string) => v !== "solo")
      : [...tracks[index].soloMute, "solo"];
  }

  function muteTrack(index: number) {
    tracks[index].soloMute = tracks[index].soloMute.includes("mute")
      ? tracks[index].soloMute.filter((v: string) => v !== "mute")
      : [...tracks[index].soloMute, "mute"];
  }

  function rewindPlayhead() {
    playhead.pos = Math.max(0, playhead.pos - 1);
  }

  function fastForwardPlayhead() {
    playhead.pos = Math.max(0, playhead.pos + 1);
  }

  function playPause() {
    playhead.playing = !playhead.playing;
  }

  function startStopRecording() {
    playhead.recording = !playhead.recording;
    playhead.playing = playhead.recording;
  }

  function createProject() {
    let a = projectTemplates.default;
    a.id = crypto.randomUUID();
    let name = newProjectName;
    if (name === "" || name === " ") {
      let index = 1;
      while (true) {
        name = `Untitled Project ${index}`;
        if (!Object.keys(projects).includes(name)) {
          break;
        }
        index += 1;
      }
    }
    projects[name] = a;
    selectedProject = a;
    showCreateProjectDialog = false;
  }

  function saveProject() {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(projects[selectedProjectId]));
    const dlAnchorElem = document.createElement("a");
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute(
      "download",
      `${projects[selectedProjectId].name}.timecrash`,
    );
    dlAnchorElem.click();
    showSaveProjectDialog = false;
  }

  function openProject() {
    const inputElem = document.createElement("input");
    inputElem.type = "file";
    inputElem.accept = ".timecrash";
    inputElem.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          const projectData = JSON.parse(e.target.result as string);
          console.log(projectData.id);
          console.log(Object.keys(projects));
          if (Object.keys(projects).includes(projectData.id)) {
            showProjectConflictDialog = true;
            console.log(
              "Project conflict detected. Please resolve the conflict.",
            );
            return;
          }
          projects[projectData.name] = projectData;
          selectedProjectId = projectData.name;
        }
      };
      reader.readAsText(file);
    };
    inputElem.click();
  }

  let mouseDownOnRuler = $state(false);

  function handleMouseMove(e: MouseEvent) {
    if (mouseDownOnRuler) {
      playhead.pos = Math.max(0, (e.clientX - trackClipAreaStartX) / viewScale);
    }
  }

  function handleMouseUp() {
    mouseDownOnRuler = false;
  }

  function addMediaItemToTrackAsClip(mediaItemId: string, trackId: string) {
    const mediaItem: MediaItem = mediaPool.find(
      (mediaItem: MediaItem) => mediaItem.id === mediaItemId,
    );
    const track = tracks.find((track: TrackLike) => track.id === trackId);
    track.clips.push({
      id: crypto.randomUUID(),
      mediaItem: mediaItem,
      inTrackStart: 0,
      inMediaStart: 0,
      inMediaEnd: 10,
      speed: 1,
    });
  }
</script>

<svelte:head>
  <title>timecrash app</title>
  <meta property="og:title" content="timecrash" />
  <meta property="og:description" content="multimedia workstation" />
  <meta property="og:url" content="https://supersonic.software/timecrash" />
  <meta property="og:site_name" content="Supersonic" />
  <meta property="theme-color" content="#0000FF" />
</svelte:head>

<svelte:window onmousemove={handleMouseMove} onmouseup={handleMouseUp} />

<ContextMenu.Root bind:open={showDeleteContextMenu}></ContextMenu.Root>

<Dialog.Root bind:open={showSaveProjectDialog}>
  <!-- <Dialog.Root open={true}> -->
  <Dialog.Content>
    <Dialog.Header>Save Project</Dialog.Header>
    <div class="flex gap-2">
      <Checkbox id="saveViewOptions" checked={true} />
      <Label for="saveViewOptions">Bundle media files</Label>
    </div>
    <div class="flex gap-2">
      <Checkbox id="saveViewOptions" checked={true} />
      <Label for="saveViewOptions">Save View Options</Label>
    </div>
    <div class="flex gap-2">
      <Checkbox id="savePalettes" checked={true} />
      <Label for="savePalettes">Save Custom Color Palettes</Label>
    </div>
    <Button onclick={saveProject}>Save</Button>
  </Dialog.Content>
</Dialog.Root>

<AlertDialog.Root open={showProjectConflictDialog}>
  <AlertDialog.Content class="[&>button:last-child]:hidden">
    <AlertDialog.Header>Resolve Project Conflict</AlertDialog.Header>
    <AlertDialog.Description
      >The opened project conflicts with an existing open project.</AlertDialog.Description
    >
    <Button>Keep existing open project</Button>
    <Button>Keep newly opened project</Button>
    <Button>Keep Both</Button>
    <AlertDialog.Description class="text-center">
      Selecting 'Keep Both' marks the newly opened project as a separate project
      from the existing open project.
    </AlertDialog.Description>
  </AlertDialog.Content>
</AlertDialog.Root>

<Settings bind:open={showSettings} bind:commands />

<CommandRunner
  bind:commands
  bind:showMediaPool
  bind:showCreateProjectDialog
  bind:autoSizeTracks
  bind:showCommandRunner
  bind:showSaveProjectDialog
  bind:showSettings
  {startStopRecording}
  {playPause}
  {rewindPlayhead}
  {fastForwardPlayhead}
  {saveProject}
  {addTrackWithLastTrackType}
  {deleteLastTrack}
/>

<TopBar
  bind:playhead
  bind:bpm
  bind:timeSignature
  bind:baseTrackHeight
  bind:autoSizeTracks
  bind:showCommandRunner
  bind:showSaveProjectDialog
  {saveProject}
  {openProject}
/>

<Resizable.PaneGroup direction="horizontal" class="h-full mt-1">
  <Resizable.Pane class="h-full">
    <Tabs.Root class="h-full" bind:value={selectedProjectId}>
      <ProjectTabBar
        {projects}
        {projectTemplates}
        {createProject}
        {newProjectName}
        {newProjectTemplate}
        bind:showCreateProjectDialog
      />
      {#each Object.keys(projects) as project (projects[project].id)}
        <Tabs.Content value={projects[project].id} class="h-full">
          <div class="flex w-full dark:bg-zinc-900 bg-zinc-300 justify-between">
            <Popover.Root>
              <Popover.Trigger
                class={buttonVariants({ variant: "timecrashTopButtons" })}
                ><Plus />Add Tracks</Popover.Trigger
              >
              <AddTrackPopoverContent
                bind:baseTrackAddAmount
                bind:baseTrackType
                {addTracks}
              />
            </Popover.Root>
            <div class="flex">
              <ColorPicker big />
              <Popover.Root>
                <Popover.Trigger
                  class={buttonVariants({ variant: "timecrashTopButtons" })}
                >
                  <Settings2 />
                </Popover.Trigger>
                <ViewAndPlaybackOptionsPopoverContent />
              </Popover.Root>
            </div>
          </div>

          <NoTracks bind:trackCount {addTrackWithLastTrackType} />

          <Timeline
            bind:playhead
            {trackClipAreaStartX}
            {viewScale}
            {addTrackWithLastTrackType}
          >
            <div class="flex flex-col" style="margin-top: {rulerHeight}px">
              {#each projects[project].tracks as track, index (track.id)}
                <TrackControlBox
                  {index}
                  bind:track={projects[project].tracks[index]}
                  bind:trackClipAreaStartX
                  {trackCount}
                  {deleteTrack}
                />
              {/each}
            </div>
            <ScrollArea orientation="horizontal" class="w-full">
              <Ruler
                bind:mouseDownOnRuler
                bind:rulerHeight
                {timelineLength}
                {trackClipAreaStartX}
                {viewScale}
              />
              <div class="flex flex-col h-full">
                {#each projects[project].tracks as track, index (track.id)}
                  <TrackClipArea
                    {index}
                    bind:track={projects[project].tracks[index]}
                    bind:trackClipAreaStartX
                    bind:playhead
                    {trackCount}
                    {viewScale}
                    {soloTrack}
                    {muteTrack}
                    {deleteTrack}
                    {mediaPool}
                    {addMediaItemToTrackAsClip}
                  />
                {/each}
              </div>
            </ScrollArea>
          </Timeline>
        </Tabs.Content>
      {/each}
    </Tabs.Root>
  </Resizable.Pane>
  <Resizable.Handle class="w-1" />
  <div class:hidden={!showMediaPool}>
    <Resizable.Pane class="h-full z-2! max-w-150 w-100" defaultSize={35}>
      <MediaPool
        bind:mediaPool
        bind:tracks
        bind:baseTrackAddAmount
        bind:baseTrackType
        {addTracks}
        {addMediaItemToTrackAsClip}
      />
    </Resizable.Pane>
  </div>
</Resizable.PaneGroup>

<BottomBar bind:trackCount bind:playhead />
