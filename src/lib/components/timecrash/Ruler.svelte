<script lang="ts">
  let {
    mouseDownOnRuler = $bindable(false),
    rulerHeight = $bindable(5),
    timelineLength,
    trackClipAreaStartX,
    viewScale,
  } = $props();
</script>

<div
  class="h-{rulerHeight} w-full dark:bg-neutral-800 bg-neutral-200"
  onmousedown={() => (mouseDownOnRuler = true)}
  role="presentation"
>
  {#each { length: timelineLength }, num}
    <span
      class="text-zinc-400 absolute text-center font-mono text-sm"
      style:left={trackClipAreaStartX + num * viewScale + "px"}>{num}</span
    >
  {/each}
</div>
