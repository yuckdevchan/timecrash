<script lang="ts">
  import { Triangle } from "@lucide/svelte";

  let { trackClipAreaStartX, playhead, viewScale } = $props();
</script>

<div
  class="absolute w-1 border border-red-700 bg-red-500 pointer-events-none z-10"
  class:hidden={trackClipAreaStartX <= 0 || !playhead.exists}
  style="left: {playhead.pos * viewScale + trackClipAreaStartX}px;"
>
  <Triangle
    class="-translate-[0.6725em] rotate-180 fill-red-500 stroke-red-700"
  />
</div>
