<script lang="ts">
  import WaveSurfer from "$lib/wavesurfer.esm.js";
  import { onMount } from "svelte";

  let { clip } = $props();
  let fileOrBlob: File | Blob = clip.mediaItem.file ? "file" : "blob";
  let mediaItemURL;
  try {
    mediaItemURL = URL.createObjectURL(fileOrBlob);
  } catch (error) {
    console.error(error);
    mediaItemURL = null;
  }

  onMount(() => {
    if (mediaItemURL) {
      WaveSurfer.create({
        container: `#waveform-${clip.id}`,
        waveColor: "oklch(37.9% 0.146 265.522)",
        progressColor: "oklch(37.9% 0.146 265.522)",
        url: mediaItemURL,
        height: 30,
        dragToSeek: false,
        cursorWidth: 0,
        splitChannels: { overlay: true },
      });
    }
  });
</script>

<div id={`waveform-${clip.id}`}></div>
