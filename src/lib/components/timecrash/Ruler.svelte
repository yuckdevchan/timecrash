<script lang="ts">
  let {
    mouseDownOnRuler = $bindable(false),
    handleMouseMove,
    playhead = $bindable(),
    rulerHeight = $bindable(5),
    timelineLength,
    viewScale,
  } = $props();
</script>

<div
  class="h-{rulerHeight} w-full dark:bg-neutral-800 bg-neutral-200 flex items-center"
  onmousedown={(event) => {
    mouseDownOnRuler = true;
    handleMouseMove(event);
  }}
  ondblclick={() => {
    playhead.pos = 0;
  }}
  role="presentation"
>
  {#each { length: timelineLength }, num}
    {@const numLength = num.toString().length}
    <div
      class="flex flex-col items-center justify-between absolute h-{rulerHeight} transition-all duration-300"
      style:width={numLength + "ch"}
      style:transform={"translate(calc(" +
        num * viewScale +
        "px - " +
        numLength +
        "ch/2))"}
    >
      <!-- Number -->
      <span
        class="text-zinc-400 text-center font-mono text-sm flex items-center h-full"
      >
        {num}
      </span>
      <!-- Line -->
      <div class="h-3 bg-zinc-400" style="width: 1px;"></div>
    </div>
  {/each}
</div>
