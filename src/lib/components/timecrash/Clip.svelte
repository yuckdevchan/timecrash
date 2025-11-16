<script lang="ts">
  let { clip = $bindable(), track = $bindable(), index } = $props();

  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";

  import { Trash } from "@lucide/svelte";

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
      <span class="text-ellipsis rounded-t-md bg-blue-900 p-1 text-sm"
        >{clip.mediaItem.name}</span
      >
      <Waveform {clip} />
    </li>
  </ContextMenu.Trigger>
  <ContextMenu.Content>
    <span class="px-1 py-2 text-sm uppercase text-zinc-600">Clip Options</span>
    <ContextMenu.Item onclick={removeThisClip}><Trash />Remove</ContextMenu.Item
    >
  </ContextMenu.Content>
</ContextMenu.Root>
