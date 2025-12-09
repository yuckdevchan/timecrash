<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";

  import Clip from "$lib/components/timecrash/Clip.svelte";
  import TrackOptions from "$lib/components/timecrash/TrackOptions.svelte";

  import type { MediaItem } from "$lib/index.d.ts";

  let {
    index,
    track = $bindable(),
    playhead = $bindable(),
    baseTrackHeight,
    trackClipAreaStartX,
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
  <ContextMenu.Trigger>
    <div class="h-full" style:height={baseTrackHeight + "px"}>
      <button
        class="h-full relative flex w-full border-t-2 border-neutral-300 dark:border-zinc-900 dark:bg-neutral-950 focus:outline-none"
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
          <Clip {clip} bind:track {index} {viewScale} />
        {/each}
      </button>
    </div>
  </ContextMenu.Trigger>
  <TrackOptions {index} {track} {muteTrack} {soloTrack} {deleteTrack} />
</ContextMenu.Root>
