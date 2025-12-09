<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";

  import Playhead from "$lib/components/timecrash/Playhead.svelte";

  import { SkipBack } from "@lucide/svelte";

  let {
    children,
    playhead = $bindable(),
    trackClipAreaStartX,
    viewScale,
    addTrackWithLastTrackType,
  } = $props();

  $effect(() => {
    let pollingRate = 60;
    if (playhead.playing) {
      const interval = setInterval(() => {
        playhead.pos += (1 / pollingRate) * playhead.speed;
      }, 1000 / pollingRate);
      return () => clearInterval(interval);
    }
  });
</script>

<Playhead {trackClipAreaStartX} {playhead} {viewScale} />

<div class="flex">
  {@render children()}
</div>

{#if playhead.exists}
  <div class="flex h-full w-full items-center justify-start">
    <button
      class="border-r-2 border-zinc-500 bg-zinc-300 dark:border-zinc-900 dark:bg-neutral-950 h-full flex flex-col items-center justify-between focus:outline-none flex-shrink-0"
      style="width: {trackClipAreaStartX}px !important;"
      ondblclick={addTrackWithLastTrackType}
      aria-label="Double click to add a new audio track"
    >
    </button>

    <ContextMenu.Root>
      <ContextMenu.Trigger
        class="h-full focus:outline-none flex-1"
        aria-label="Click to set playhead position to cursor; Double click to set playhead position to zero"
        onclick={(event: MouseEvent) => {
          playhead.pos = Math.max(
            0,
            (event.clientX - trackClipAreaStartX) / viewScale,
          );
        }}
        ondblclick={() => {
          playhead.pos = 0;
        }}
      ></ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item
          onclick={() => {
            playhead.pos = 0;
          }}
        >
          <SkipBack />Reset Playhead Position
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  </div>
{/if}
