<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";

  import { X } from "@lucide/svelte";

  let { title, children, open = $bindable(true) } = $props();

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
  class="flex flex-col absolute bg-popover z-10 rounded-md border shadow-md resize"
  style={`top:${y}px; left:${x}px;`}
  role="dialog"
  aria-labelledby="windowTitle"
>
  <ContextMenu.Root>
    <ContextMenu.Trigger>
      <div
        id="windowTitle"
        class="flex items-center justify-between border-b select-none rounded-t-md"
        class:dark:bg-neutral-950={dragging}
        class:bg-neutral-100={dragging}
        onmousedown={handleMouseDown}
        aria-label="Drag to move window"
        role="button"
        tabindex="0"
      >
        <span class="p-1 ml-1">{title}</span>
        <button
          class="p-1 hover:bg-red-500 hover:text-white rounded-tr-md"
          onclick={() => {
            open = false;
          }}
        >
          <X />
        </button>
      </div>
    </ContextMenu.Trigger>
    <ContextMenu.Content>
      <ContextMenu.Item
        onSelect={() => {
          open = false;
        }}
      >
        <X />Close Window
      </ContextMenu.Item>
    </ContextMenu.Content>
  </ContextMenu.Root>

  <div class="p-4">
    {@render children?.()}
  </div>
</div>
