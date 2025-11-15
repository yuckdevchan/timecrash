<script lang="ts">
	let {
		trackCount = $bindable(),
		playhead = $bindable()
	} = $props();
</script>

<div class="fixed bottom-0 left-0 right-0 flex h-[1.5em] items-center justify-between border-t border-zinc-300 bg-zinc-200 text-sm text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 select-none">
	<span class="border-r h-full px-4"><span class="font-mono">{trackCount}</span> track{trackCount > 1 ? 's' : ''}</span>
</div>
