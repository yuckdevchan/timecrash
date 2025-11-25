<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";

  import { Triangle, SkipBack } from "@lucide/svelte";

  let {
    children,
    playhead = $bindable(),
    mouseDownOnRuler = $bindable(),
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
  class="absolute z-1 h-full w-1 border border-red-700 bg-red-500 pointer-events-none"
  class:hidden={trackAreaStartX <= 0 || !playhead.exists}
  style="left: {playhead.pos * viewScale + trackAreaStartX}px;"
  onmousedown={() => (mouseDownOnRuler = true)}
>
  <Triangle
    class="-translate-[0.6725em] rotate-180 fill-red-500 stroke-red-700"
  />
</div>

<div class="h-5 w-full bg-neutral-800">
  {#each { length: 21 }, num}
    <span
      class="text-zinc-400 absolute text-center font-mono text-sm"
      style="left: {trackAreaStartX + num * viewScale}px">{num}</span
    >
  {/each}
</div>

{@render children()}

{#if playhead.exists}
  <div class="flex h-full w-full items-center justify-start">
    <button
      class="border-r-2 border-zinc-500 bg-zinc-300 dark:border-zinc-900 dark:bg-neutral-950 h-full flex flex-col items-center justify-between focus:outline-none flex-shrink-0"
      style="width: {trackAreaStartX}px !important;"
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
            (event.clientX - trackAreaStartX) / viewScale,
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
