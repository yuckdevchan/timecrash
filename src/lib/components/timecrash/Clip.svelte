<script lang="ts">
  let { clip = $bindable(), track = $bindable(), index, viewScale } = $props();

  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Input } from "$lib/components/ui/input/index.js";

  import { Trash, Pencil } from "@lucide/svelte";

  import Waveform from "$lib/components/timecrash/Waveform.svelte";

  function removeThisClip() {
    track.clips.splice(index, 1);
  }
</script>

<ContextMenu.Root>
  <ContextMenu.Trigger>
    <li
      class="absolute left-{clip.inTrackStart} my-1 flex list-none flex-col rounded-md bg-blue-400"
    >
      <span
        class="text-ellipsis rounded-t-md bg-blue-900 p-1 text-sm text-white h-7 flex absolute left-0 transition-all duration-300"
        style:width={clip.mediaItem.audioElement.duration * viewScale + "px"}
      >
        {clip.mediaItem.name}
      </span>
      <Waveform {clip} />
    </li>
  </ContextMenu.Trigger>
  <ContextMenu.Content>
    <span class="px-1 py-2 text-sm uppercase text-zinc-600">Clip Options</span>
    <ContextMenu.Item onclick={removeThisClip}>
      <Trash />Remove
    </ContextMenu.Item>
    <ContextMenu.Item>
      <Popover.Root>
        <Popover.Trigger>
          <Pencil />Rename
        </Popover.Trigger>
        <Popover.Content>
          <div class="flex flex-col gap-4">
            <span>Rename Clip</span>
            <Input
              placeholder={clip.mediaItem.name}
              onchange={(e) => {
                clip.mediaItem.name = e.target.value;
              }}
            />
          </div>
        </Popover.Content>
      </Popover.Root>
    </ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu.Root>
