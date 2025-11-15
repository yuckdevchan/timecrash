<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';

	import CommandRunner from '$lib/components/timecrash/CommandRunner.svelte';
	import TopBar from '$lib/components/timecrash/TopBar.svelte';
	import AddTrackPopover from '$lib/components/timecrash/AddTrackPopover.svelte';
	import NoTracks from '$lib/components/timecrash/NoTracks.svelte';
	import Timeline from '$lib/components/timecrash/Timeline.svelte';
	import Track from '$lib/components/timecrash/Track.svelte';
	import MediaPool from '$lib/components/timecrash/MediaPool.svelte';
	import BottomBar from '$lib/components/timecrash/BottomBar.svelte';

	import {
		projects as projectsInit,
		defaultProjectName,
		projectTemplates,
		trackTemplates
	} from '$lib/timecrash';
	import type { TrackLike } from '$lib/timecrash/index.d.ts';

	import { Plus } from '@lucide/svelte';

	let projects = $state(projectsInit);
	let selectedProject = $state(defaultProjectName);
	let selectedProjectId = $state(projects[defaultProjectName].id);
	$effect(() => {
		selectedProject = Object.keys(projects).find(
			(projectName) => projects[projectName].id === selectedProjectId
		);
	});
	let project = $state(projects[selectedProject]);
	let tracks = $state<TrackLike[]>(project.tracks);
	let playhead = $state(project.playhead);
	let bpm = $state(project.bpm);
	let timeSignature = $state(project.timeSignature);
	let timeSignatureUpper = $state(timeSignature[0]);
	let timeSignatureLower = $state(timeSignature[1]);
	let baseTrackHeight = $state(project.baseTrackHeight);
	let baseTrackType = $state(project.baseTrackType);
	let baseTrackAddAmount = $state(project.baseTrackAddAmount);
	let trackCount = $derived(tracks.length);

	$effect(() => {
		if (selectedProject) {
			project = projects[selectedProject];
			tracks = project.tracks;
			playhead = project.playhead;
			bpm = project.bpm;
			timeSignature = project.timeSignature;
			baseTrackHeight = project.baseTrackHeight;
			baseTrackAddAmount = project.baseTrackAddAmount;
		}
	});

	$effect(() => {
		if (timeSignature) {
			timeSignatureUpper = timeSignature[0];
			timeSignatureLower = timeSignature[1];
		}
	});

	let showCommandRunner = $state(false);
	let showMediaPool = $state(true);
	let showCreateProjectDialog = $state(false);
	let trackAreaStartX = $state(0);
	let viewScale = $state(25);
	let autoSizeTracks = $state(false);

	let newProjectName = $state('');

	function addTracks(e = null, trackTypes = baseTrackType, amount = baseTrackAddAmount) {
		for (let trackType of trackTypes) {
			const template = trackTemplates[trackType];
			for (let i = 0; i < amount; i++) {
				const track = { ...template };
				track.id = crypto.randomUUID();
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
	}

	function deleteTrack(index: number) {
		tracks.splice(index, 1);
	}

	function soloTrack(index: number) {
		tracks[index].soloMute = tracks[index].soloMute.includes('solo')
			? tracks[index].soloMute.filter((v: string) => v !== 'solo')
			: [...tracks[index].soloMute, 'solo'];
	}

	function muteTrack(index: number) {
		tracks[index].soloMute = tracks[index].soloMute.includes('mute')
			? tracks[index].soloMute.filter((v: string) => v !== 'mute')
			: [...tracks[index].soloMute, 'mute'];
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
		if (name === '' || name === ' ') {
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
</script>

<svelte:head>
	<title>timecrash</title>
	<meta property="og:title" content="timecrash" />
	<meta property="og:description" content="multimedia workstation" />
	<meta property="og:url" content="https://supersonic.software/timecrash" />
	<meta property="og:site_name" content="Supersonic" />
	<meta property="theme-color" content="#0000FF" />
</svelte:head>

<CommandRunner
	bind:showMediaPool
	bind:showCreateProjectDialog
	bind:autoSizeTracks
	bind:showCommandRunner
	{startStopRecording}
	{playPause}
	{rewindPlayhead}
	{fastForwardPlayhead}
/>

<TopBar
	bind:playhead
	bind:bpm
	bind:timeSignatureUpper
	bind:timeSignatureLower
	bind:baseTrackHeight
	bind:autoSizeTracks
	bind:showCommandRunner
/>

<Resizable.PaneGroup direction="horizontal" class="h-full">
	<Resizable.Pane class="h-full">
		<Tabs.Root bind:value={selectedProjectId}>
			<Tabs.List class="mt-1 rounded-none bg-transparent">
				{#each Object.keys(projects) as project (projects[project].id)}
					<Tabs.Trigger value={projects[project].id}>{project}</Tabs.Trigger>
				{/each}
				<Dialog.Root bind:open={showCreateProjectDialog}>
					<Dialog.Trigger
						class="hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 ml-1 flex h-full w-8 items-center justify-center rounded-sm"
						><Plus /></Dialog.Trigger
					>
					<Dialog.Content>
						<Dialog.Header>New Project</Dialog.Header>
						<label for="projectName" class="select-none">Project Name</label>
						<Input
							id="projectName"
							placeholder="Untitled Project"
							bind:value={newProjectName}
							onkeypress={(e) => {
								if (e.key === 'Enter') {
									createProject();
								}
							}}
						></Input>
						<label for="templateSelect" class="select-none">Template</label>
						<Select.Root type="single" value="default">
							<Select.Trigger
								class="w-full"
								onkeypress={(e) => {
									if (e.key === 'Enter') {
										createProject();
									}
								}}>Select a Template</Select.Trigger
							>
							<Select.Content>
								{#each Object.keys(projectTemplates) as template (template)}
									<Select.Item value={template}
										>{projectTemplates[template].templateName}</Select.Item
									>
								{/each}
							</Select.Content>
						</Select.Root>
						<label for="bpm" class="select-none">BPM</label>
						<Input
							id="bpm"
							placeholder="Beats per minute"
							onkeypress={(e) => {
								if (e.key === 'Enter') {
									createProject();
								}
							}}
						></Input>
						<Button type="submit" onclick={createProject}>Create</Button>
					</Dialog.Content>
				</Dialog.Root>
			</Tabs.List>
			{#each Object.keys(projects) as project (projects[project].id)}
				<Tabs.Content value={projects[project].id} forceMount>
					<div class="flex w-full bg-zinc-900">
						<Popover.Root>
							<Popover.Trigger class={buttonVariants({ variant: 'timecrashTopButtons' })}
								><Plus />Add Tracks</Popover.Trigger
							>
							<AddTrackPopover bind:baseTrackAddAmount bind:baseTrackType {addTracks} />
						</Popover.Root>
					</div>

					<NoTracks bind:trackCount {addTracks} />

					<Timeline bind:playhead {trackAreaStartX} {viewScale}>
						{#each tracks as track, index (track.id)}
							<Track
								bind:track={tracks[index]}
								bind:trackAreaStartX
								bind:playhead
								{index}
								{baseTrackHeight}
								{deleteTrack}
								{soloTrack}
								{muteTrack}
								{trackCount}
								{viewScale}
								{autoSizeTracks}
							/>
						{/each}
					</Timeline>
				</Tabs.Content>
			{/each}
		</Tabs.Root>
	</Resizable.Pane>
	<Resizable.Handle class="w-1" />
	<div class:hidden={!showMediaPool}>
		<Resizable.Pane class="h-full" defaultSize={35}>
			<MediaPool bind:tracks bind:baseTrackAddAmount bind:baseTrackType {addTracks} />
		</Resizable.Pane>
	</div>
</Resizable.PaneGroup>

<BottomBar bind:trackCount bind:playhead />
