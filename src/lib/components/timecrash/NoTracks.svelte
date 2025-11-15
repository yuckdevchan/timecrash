<script lang="ts">
	import * as Empty from '$lib/components/ui/empty/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	import { ListMusic } from '@lucide/svelte';

	let { trackCount = $bindable(), addTracks = $bindable() } = $props();
</script>

{#if trackCount === 0}
	<Empty.Root>
		<Empty.Header>
			<Empty.Media variant="icon">
				<ListMusic />
			</Empty.Media>
			<Empty.Title>No tracks</Empty.Title>
			<Empty.Description>Add a track to get started.</Empty.Description>
		</Empty.Header>
		<Empty.Content>
			<Button onclick={addTracks}>Add an audio track</Button>
		</Empty.Content>
	</Empty.Root>
{/if}
