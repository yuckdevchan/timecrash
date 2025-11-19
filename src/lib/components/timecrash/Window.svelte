<script lang="ts">
  import { X } from "@lucide/svelte";

  let { title, children } = $props();

  let x = $state(100);
  let y = $state(100);

  let dragging = $state(false);
  let offsetX = $state(0);
  let offsetY = $state(0);

  function handleMouseDown(event: MouseEvent) {
    dragging = true;
    offsetX = event.clientX - x;
    offsetY = event.clientY - y;
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMove(event: MouseEvent) {
    if (!dragging) return;
    x = event.clientX - offsetX;
    y = event.clientY - offsetY;
  }

  function handleMouseUp() {
    dragging = false;
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }
</script>

<div
  class="flex flex-col absolute bg-popover z-10 rounded-md border shadow-md"
  style={`top:${y}px; left:${x}px;`}
  role="dialog"
  aria-labelledby="windowTitle"
>
  <div
    id="windowTitle"
    class="flex items-center justify-between border-b select-none rounded-t-md"
    class:bg-neutral-950={dragging}
    onmousedown={handleMouseDown}
    aria-label="Drag to move window"
    role="heading"
  >
    <span class="p-1 ml-1">{title}</span>
    <button class="p-1 hover:bg-red-500 rounded-tr-md">
      <X />
    </button>
  </div>

  <div class="p-4">
    {@render children?.()}
  </div>
</div>
