<script lang="ts">
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";
  import { Slider } from "$lib/components/ui/slider/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  import NumericInput from "$lib/components/timecrash/NumericInput.svelte";
  import Clip from "$lib/components/timecrash/Clip.svelte";

  import type { TrackLike, Playhead } from "$lib/timecrash/index.d.ts";

  import {
    X,
    HeadphoneOff,
    Headphones,
    Volume2,
    VolumeOff,
    Trash2,
  } from "@lucide/svelte";

  type Props = {
    track: TrackLike;
    trackAreaStartX: number;
    playhead: Playhead;
    index: number;
    baseTrackHeight: number;
    deleteTrack: (index: number) => void;
    soloTrack: (index: number) => void;
    muteTrack: (index: number) => void;
    trackCount: number;
    viewScale: number;
    autoSizeTracks: boolean;
    inProjectId: string;
    selectedProjectId: string;
  };

  let {
    track = $bindable(),
    trackAreaStartX = $bindable(),
    trackAreaStartY = $bindable(),
    playhead = $bindable(),
    index,
    baseTrackHeight,
    deleteTrack,
    soloTrack,
    muteTrack,
    trackCount,
    viewScale,
    autoSizeTracks,
    inProjectId,
    selectedProjectId = $bindable(),
  }: Props = $props();

  let trackAreaStartXValue = $state(0);
  let trackAreaStartYValue = $state(0);

  if (index === 0 && inProjectId === selectedProjectId) {
    $effect(() => {
      trackAreaStartX = trackAreaStartXValue;
      trackAreaStartY = trackAreaStartYValue;
    });
  }

  // $effect(() => {
  // console.log(`${selectedProjectId}, ${inProjectId}, ${track.id}`);
  // });
</script>

<!-- {track.id} -->

{#snippet trackControlBox(
  index: number,
  track: TrackLike,
  trackCount: number,
  deleteTrack: (index: number) => void,
)}
  <span
    class="flex h-full flex-col items-center justify-between bg-gray-300 font-mono text-gray-700 dark:bg-gray-600 dark:text-gray-300"
  >
    <Button
      variant="ghost"
      class="w-full rounded-none hover:bg-red-600! transition-colors duration-200"
      onclick={() => deleteTrack(index)}
    >
      <X class="h-5 w-5" />
    </Button>
    <span class="font-bold">{index + 1}</span>
  </span>

  <div
    class="w-75 flex flex-col border-r-2 border-t-2 border-zinc-900 bg-zinc-900"
    class:border-b-2={index === trackCount - 1}
  >
    <div class="mr-2 flex">
      <input
        bind:value={track.name}
        class="mb-4 h-[1.3em] w-full p-2 py-4 focus:outline-none"
      />
      <ToggleGroup.Root type="multiple" bind:value={track.soloMute}>
        <ToggleGroup.Item value="solo"><Headphones /></ToggleGroup.Item>
        <ToggleGroup.Item value="mute"><VolumeOff /></ToggleGroup.Item>
      </ToggleGroup.Root>
    </div>
    <div class="flex w-full max-w-full flex-row gap-2 p-2">
      <span class="flex gap-1 text-sm text-zinc-400">
        <div class="flex w-16 justify-end">
          <NumericInput
            bind:value={track.gain}
            min={-100}
            max={6}
            step={1}
            plus={true}
          />
        </div>
        <span>dB</span>
      </span>
      <Slider
        bind:value={track.gain}
        type="single"
        min={-100}
        max={6}
        step={1}
        class="w-full hover:cursor-col-resize"
      />
    </div>
  </div>
{/snippet}

<ContextMenu.Root>
  <ContextMenu.Trigger>
    <div
      class="flex transition-all duration-300"
      style="height: {autoSizeTracks
        ? '100%'
        : track.height === -1
          ? baseTrackHeight
          : track.height}px;"
    >
      <!-- TRACK CONTROL BOX -->
      {#if index === 0 && inProjectId === selectedProjectId}
        <div bind:clientWidth={trackAreaStartXValue} class="flex">
          {@render trackControlBox(index, track, trackCount, deleteTrack)}
        </div>
      {:else}
        <div class="flex">
          {@render trackControlBox(index, track, trackCount, deleteTrack)}
        </div>
      {/if}
      <!-- CLIP AREA -->
      <div
        class="relative flex w-full border-t-2 border-zinc-900 bg-neutral-950 focus:outline-none"
        class:border-b-2={index === trackCount - 1}
        role="row"
        tabindex={index}
        ondblclick={() => {
          playhead.pos = 0;
        }}
      >
        {#each track.clips as clip, index (clip.id)}
          <Clip {clip} bind:track {index} />
        {/each}
      </div>
    </div>
  </ContextMenu.Trigger>
  <ContextMenu.Content>
    <span class="px-1 py-2 text-sm uppercase text-zinc-600">Track Options</span>
    <ContextMenu.Item onclick={() => soloTrack(index)}
      >{#if track.soloMute.includes("solo")}<HeadphoneOff
        />Unsolo{:else}<Headphones />Solo{/if}</ContextMenu.Item
    >
    <ContextMenu.Item onclick={() => muteTrack(index)}
      >{#if track.soloMute.includes("mute")}<Volume2 />Unmute{:else}<VolumeOff
        />Mute{/if}</ContextMenu.Item
    >
    <ContextMenu.Item onclick={() => deleteTrack(index)}
      ><Trash2 />Delete</ContextMenu.Item
    >
  </ContextMenu.Content>
</ContextMenu.Root>
