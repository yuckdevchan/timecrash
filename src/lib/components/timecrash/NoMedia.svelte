<script lang="ts">
	import * as Empty from '$lib/components/ui/empty/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	import { ListMusic } from '@lucide/svelte';

	let { mediaPoolSize } = $props();
</script>

{#if mediaPoolSize === 0}
	<Empty.Root class="select-none">
		<Empty.Header>
			<Empty.Media variant="icon">
				<ListMusic />
			</Empty.Media>
			<Empty.Title>No Media</Empty.Title>
			<Empty.Description>Upload a clip to get started.</Empty.Description>
		</Empty.Header>
		<Empty.Content>
			<Button
				onclick={() => {
					document.getElementById('fileSelector').click();
				}}>Upload a media file</Button
			>
		</Empty.Content>
	</Empty.Root>
{/if}
