<script lang="ts">
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Slider } from "$lib/components/ui/slider/index.js";

  import NumericInput from "$lib/components/timecrash/NumericInput.svelte";

  import type { TrackLike } from "$lib/index.d.ts";

  import { X, Headphones, VolumeOff } from "@lucide/svelte";

  let {
    index,
    track = $bindable(),
    trackClipAreaStartX = $bindable(0),
    trackCount,
    deleteTrack,
  } = $props();
</script>

<div class="flex h-full">
  <!-- Grey side part -->
  <span
    class="flex h-full flex-col items-center justify-between bg-gray-300 border-t-2 border-zinc-500 font-mono text-gray-700 dark:bg-gray-600 dark:text-gray-300 dark:border-zinc-900"
    class:border-b-2={index === trackCount - 1}
  >
    <Button
      variant="ghost"
      class="w-full rounded-none hover:bg-red-500! transition-colors duration-200 hover:text-white!"
      onclick={() => deleteTrack(index)}
    >
      <X class="h-5 w-5" />
    </Button>
    <span class="font-bold">{index + 1}</span>
  </span>

  <!-- Part with controls -->
  <div
    class="w-75 flex flex-col border-r-2 border-t-2 dark:border-zinc-900 dark:bg-zinc-900 border-zinc-500 bg-zinc-200"
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
</div>
