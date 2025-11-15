<script lang="ts">
	import { Triangle } from '@lucide/svelte';

	let { children, playhead = $bindable(), trackAreaStartX, viewScale } = $props();

	$effect(() => {
		if (playhead.playing) {
			const interval = setInterval(() => {
				playhead.pos += 0.05;
			}, 50);
			return () => clearInterval(interval);
		}
	});
</script>

<div
	class="absolute z-[9999] h-full w-1 border border-red-700 bg-red-500"
	style="left: {playhead.pos * viewScale}px; transform: translateX({trackAreaStartX}px);"
>
	<Triangle class="-translate-[11px] rotate-180 fill-red-500 stroke-red-700" />
</div>
{@render children()}
