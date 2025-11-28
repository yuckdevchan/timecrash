<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";

  import {
    HeadphoneOff,
    Headphones,
    Volume2,
    VolumeOff,
    Trash2,
  } from "@lucide/svelte";

  let { index, track, muteTrack, soloTrack, deleteTrack } = $props();
</script>

<ContextMenu.Content>
  <span class="px-1 py-2 text-sm uppercase text-zinc-600">Track Options</span>
  <ContextMenu.Item onclick={() => soloTrack(index)}
    >{#if track.soloMute.includes("solo")}<HeadphoneOff
      />Unsolo{:else}<Headphones />Solo{/if}</ContextMenu.Item
  >
  <ContextMenu.Item onclick={() => muteTrack(index)}
    >{#if track.soloMute.includes("mute")}<Volume2 />Unmute{:else}<VolumeOff
      />Mute{/if}</ContextMenu.Item
  >
  <ContextMenu.Item onclick={() => deleteTrack(index)}
    ><Trash2 />Delete</ContextMenu.Item
  >
</ContextMenu.Content>
