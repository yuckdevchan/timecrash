<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";

  import Clip from "$lib/components/timecrash/Clip.svelte";

  import type { MediaItem } from "$lib/index.d.ts";

  import {
    X,
    HeadphoneOff,
    Headphones,
    Volume2,
    VolumeOff,
    Trash2,
  } from "@lucide/svelte";

  let {
    index,
    track = $bindable(),
    trackClipAreaStartX = $bindable(0),
    playhead = $bindable(),
    trackCount,
    viewScale,
    soloTrack,
    muteTrack,
    deleteTrack,
    mediaPool,
    addMediaItemToTrackAsClip,
  } = $props();

  function handleDrop(event: DragEvent) {
    event.preventDefault();
    const mediaItemId = event.dataTransfer?.getData("text/plain");
    const mediaItem = mediaPool.find(
      (mediaItem: MediaItem) => mediaItem.id === mediaItemId,
    );
    addMediaItemToTrackAsClip(mediaItem.id, track.id);
  }
</script>

<ContextMenu.Root>
  <ContextMenu.Trigger class="h-full">
    <div class="h-full">
      <button
        class="h-full relative flex w-full border-t-2 dark:border-zinc-900 dark:bg-neutral-950 focus:outline-none"
        class:border-b-2={index === trackCount - 1}
        role="row"
        tabindex={index}
        onclick={(event) => {
          playhead.pos = Math.max(
            0,
            (event.clientX - trackClipAreaStartX) / viewScale,
          );
        }}
        ondblclick={() => {
          playhead.pos = 0;
        }}
        ondragover={(e) => {
          e.preventDefault();
        }}
        ondrop={handleDrop}
      >
        {#each track.clips as clip, index (clip.id)}
          <Clip {clip} bind:track {index} />
        {/each}
      </button>
    </div>
  </ContextMenu.Trigger>
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
</ContextMenu.Root>
