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
  class="h-{rulerHeight} w-full dark:bg-neutral-800 bg-neutral-200 flex items-center"
  onmousedown={() => (mouseDownOnRuler = true)}
  role="presentation"
>
  {#each { length: timelineLength }, num}
    <div
      class="flex flex-col items-center justify-between absolute h-{rulerHeight} transition-all duration-300"
      style:transform={"translateX(" +
        (trackClipAreaStartX + num) * viewScale +
        "px)"}
    >
      <!-- Number -->
      <span
        class="text-zinc-400 text-center font-mono text-sm flex items-center h-full"
      >
        {num}
      </span>
      <!-- Line -->
      <div
        class="h-3 bg-zinc-400"
        style="width: 1px;"
        style:left={trackClipAreaStartX + num * viewScale + "px"}
      ></div>
    </div>
  {/each}
</div>
