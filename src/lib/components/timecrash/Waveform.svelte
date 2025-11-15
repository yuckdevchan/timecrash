<script lang="ts">
	import WaveSurfer from '$lib/timecrash/wavesurfer.esm.js';
	import { onMount } from 'svelte';

	let { clip } = $props();
	let mediaItemURL = URL.createObjectURL(clip.mediaItem.file);

	onMount(() => {
		const wavesurfer = WaveSurfer.create({
			container: `#waveform-${clip.id}`,
			waveColor: 'oklch(37.9% 0.146 265.522)',
			progressColor: 'oklch(37.9% 0.146 265.522)',
			url: mediaItemURL,
			height: 30,
			dragToSeek: false,
			cursorWidth: 0,
			splitChannels: { overlay: true }
		});
	});
</script>

<div id={`waveform-${clip.id}`}></div>
