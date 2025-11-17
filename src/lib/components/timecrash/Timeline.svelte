<script lang="ts">
  import { Triangle } from "@lucide/svelte";

  let {
    children,
    playhead = $bindable(),
    trackAreaStartX,
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

<div
  class="absolute z-1 h-full w-1 border border-red-700 bg-red-500"
  class:hidden={trackAreaStartX <= 0 || !playhead.exists}
  style="left: {playhead.pos * viewScale + trackAreaStartX}px;"
>
  <Triangle
    class="-translate-[0.6725em] rotate-180 fill-red-500 stroke-red-700"
  />
</div>

{@render children()}

{#if playhead.exists}
  <button
    class="border-r-2 border-zinc-500 bg-zinc-300 dark:border-zinc-900 dark:bg-neutral-950 h-full flex flex-col items-center justify-between focus:outline-none"
    style="width: {trackAreaStartX}px;"
    ondblclick={addTrackWithLastTrackType}
    aria-label="Double click to add a new audio track"
  >
  </button>
{/if}
