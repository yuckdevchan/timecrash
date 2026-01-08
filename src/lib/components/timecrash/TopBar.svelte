<script lang="ts">
  import { setMode, mode } from "mode-watcher";

  import * as Menubar from "$lib/components/ui/menubar/index.js";
  import * as Kbd from "$lib/components/ui/kbd/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  import { secondsToDurationString } from "$lib/utils.ts";

  import {
    CodeXml,
    Info,
    Play,
    Pause,
    Circle,
    Square,
    Rewind,
    FastForward,
    SkipBack,
    ChevronUp,
    Search,
  } from "@lucide/svelte";

  let {
    playhead = $bindable(),
    bpm = $bindable(),
    timeSignature = $bindable(),
    baseTrackHeight = $bindable(),
    autoSizeTracks = $bindable(),
    showAboutDialog = $bindable(),
    showAddTracksPopover = $bindable(),
    showCommandRunner = $bindable(),
    showSaveProjectDialog = $bindable(),
    showCreateProjectDialog = $bindable(),
    showMediaPool = $bindable(),
    showColorPicker = $bindable(),
    openProject,
  } = $props();
</script>

<div class="flex items-center justify-between">
  <Menubar.Root class="rounded-none border-none shadow-none">
    <Menubar.Menu>
      <Menubar.Trigger>timecrash</Menubar.Trigger>
      <Menubar.Content>
        <Menubar.Item
          onclick={() => {
            showAboutDialog = true;
          }}><Info />About</Menubar.Item
        >
        <Menubar.Item
          onclick={() => {
            open("https://github.com/yuckdevchan/timecrash");
          }}><CodeXml />Source Code on GitHub</Menubar.Item
        >
      </Menubar.Content>
    </Menubar.Menu>
    <Menubar.Menu>
      <Menubar.Trigger>File</Menubar.Trigger>
      <Menubar.Content>
        <Menubar.Item onclick={() => (showCreateProjectDialog = true)}>
          New Project
          <Menubar.Shortcut class="flex items-center"
            ><ChevronUp />N</Menubar.Shortcut
          >
        </Menubar.Item>
        <Menubar.Item onclick={openProject}>
          Open Project
          <Menubar.Shortcut>⌘O</Menubar.Shortcut>
        </Menubar.Item>
        <Menubar.Item
          onclick={() => {
            showSaveProjectDialog = true;
          }}
        >
          Save Project
          <Menubar.Shortcut>⌘S</Menubar.Shortcut>
        </Menubar.Item>
        <Menubar.Separator />
        <Menubar.Item
          onclick={() => document.getElementById("fileSelector")?.click()}
          >Import Media</Menubar.Item
        >
        <Menubar.Separator />
        <Menubar.Item
          >Export<Menubar.Shortcut>⌘E</Menubar.Shortcut></Menubar.Item
        >
        <Menubar.Item>Quick Export .mp3</Menubar.Item>
      </Menubar.Content>
    </Menubar.Menu>
    <Menubar.Menu>
      <Menubar.Trigger>Edit</Menubar.Trigger>
      <Menubar.Content>
        <Menubar.Item
          onclick={() => {
            showAddTracksPopover = true;
          }}
        >
          Add Tracks
          <Menubar.Shortcut>⌘T</Menubar.Shortcut>
        </Menubar.Item>
      </Menubar.Content>
    </Menubar.Menu>
    <Menubar.Menu>
      <Menubar.Trigger>View</Menubar.Trigger>
      <Menubar.Content>
        <div class="m-1 text-sm">
          Base Track Height
          <Input
            placeholder="Base Track Height (min 40)"
            type="number"
            min="90"
            step="10"
            bind:value={baseTrackHeight}
            class="mb-2 mt-1"
          ></Input>
        </div>
        <Menubar.Separator />
        <Menubar.Item onclick={() => (autoSizeTracks = !autoSizeTracks)}
          >Toggle Track Autosizing</Menubar.Item
        >
        <Menubar.Separator />
        <Menubar.Group>
          <Menubar.GroupHeading>Windows & Panes</Menubar.GroupHeading>
          <Menubar.CheckboxItem bind:checked={showColorPicker}
            >Show Color Picker</Menubar.CheckboxItem
          >
          <Menubar.CheckboxItem bind:checked={showMediaPool}
            >Show Media Pool</Menubar.CheckboxItem
          >
        </Menubar.Group>
        <Menubar.Separator />
        <Menubar.Group>
          <Menubar.GroupHeading>Appearance</Menubar.GroupHeading>
          <Menubar.CheckboxItem
            checked={mode.current === "dark"}
            onCheckedChange={(checked) => {
              setMode(checked ? "dark" : "light");
            }}>Dark Theme</Menubar.CheckboxItem
          >
        </Menubar.Group>
      </Menubar.Content>
    </Menubar.Menu>
  </Menubar.Root>

  <div class="flex h-9 max-h-9 min-h-9 items-center gap-2 pt-1">
    <Button
      variant="ghost"
      class="flex h-9 max-h-full items-center gap-1 rounded-md border dark:bg-zinc-900 p-[3px] text-sm"
      onclick={() => {
        showCommandRunner = true;
      }}
    >
      <Search size={18} />
      Menus
      <Kbd.Root>⌘</Kbd.Root>
      <Kbd.Root>K</Kbd.Root>
    </Button>
    <div
      class="flex h-9 max-h-full items-center gap-1 rounded-md border dark:bg-zinc-900 p-[3px]"
    >
      <ButtonGroup.Root>
        <Button
          variant="ghost"
          onclick={() => (playhead.pos = Math.max(0, playhead.pos - 1))}
          ><Rewind /></Button
        >
        <Button
          variant="ghost"
          onclick={() => (playhead.pos = Math.max(0, playhead.pos + 1))}
          ><FastForward /></Button
        >
        <Button
          variant="ghost"
          onclick={() => {
            playhead.pos = 0;
            playhead.playing = false;
          }}
          >{#if playhead.playing}<Square />{:else}<SkipBack />{/if}</Button
        >
        <Button
          variant="ghost"
          onclick={() => (playhead.playing = !playhead.playing)}
          >{#if playhead.playing}<Pause />{:else}<Play />{/if}</Button
        >
        <Button
          variant="ghost"
          onclick={() => {
            playhead.recording = !playhead.recording;
            playhead.playing = !playhead.playing;
          }}><Circle /></Button
        >
      </ButtonGroup.Root>
    </div>
    <div
      class="flex h-9 max-h-full items-center gap-1 rounded-md border dark:bg-zinc-900 p-[3px] pl-2 pr-2"
    >
      <input
        type="number"
        min={0}
        max={2000}
        step={1}
        bind:value={bpm}
        class="w-12 appearance-none font-mono focus:outline-none"
        placeholder="BPM"
      />
      <span>BPM</span>
    </div>
    <div
      class="w-15 flex h-9 max-h-full flex-col items-center justify-center rounded-md border dark:bg-zinc-900 p-[3px] text-[0.65rem] font-bold"
      class:border-red-500={(timeSignature[0] & (timeSignature[1] - 1)) !== 0}
    >
      <input
        type="number"
        min={0}
        max={2000}
        step={1}
        bind:value={timeSignature[0]}
        class="appearance-none font-mono focus:outline-none"
        placeholder="4"
      />
      <input
        type="number"
        min={0}
        max={2000}
        step={1}
        bind:value={timeSignature[1]}
        class="appearance-none font-mono focus:outline-none"
        placeholder="4"
      />
    </div>
    <span
      class="w-25 flex h-9 max-h-full appearance-none items-center justify-center rounded-md border dark:bg-zinc-900 p-[3px] text-center font-mono focus:outline-none"
      >{secondsToDurationString(playhead.pos)}</span
    >
  </div>
  <div class="ml-65 mr-1 flex h-9 max-h-9 min-h-9 items-center gap-2 pt-1">
    <Button class="h-8">Export</Button>
  </div>
</div>

<style>
</style>
