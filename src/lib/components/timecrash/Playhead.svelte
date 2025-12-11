<script lang="ts">
  import { getContext } from "svelte";
  import { Triangle } from "@lucide/svelte";

  let { trackClipAreaStartX, playhead, viewScale, animate, animationDuration } =
    $props();

  let debug: boolean = $state(getContext("debug"));
</script>

<div
  class="absolute w-1 border border-red-700 bg-red-500 pointer-events-none z-10! {animate
    ? 'duration-' + animationDuration
    : ''}"
  class:hidden={trackClipAreaStartX <= 0 || !playhead.exists}
  style:left={`calc(${playhead.pos * viewScale}px - (var(--spacing))/2)`}
  style:height="var(--playhead-height, 100vh)"
  class:transition-all={animate}
>
  <Triangle
    class="-translate-[0.6725em] rotate-180 fill-red-500 stroke-red-700"
  />
  {#if debug}
    <span class="w-full">
      {"pos:" + playhead.pos}
      {"playing:" + playhead.playing}
      {"recording:" + playhead.recording}
      {"speed:" + playhead.speed}
      {"animated:" + String(animate)}
    </span>
  {/if}
</div>
