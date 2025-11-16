<script lang="ts">
  import * as Empty from "$lib/components/ui/empty/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  import { ListMusic } from "@lucide/svelte";

  let { trackCount = $bindable(), addTrackWithLastTrackType } = $props();
</script>

{#if trackCount === 0}
  <button
    ondblclick={addTrackWithLastTrackType}
    class="focus:outline-none h-full w-full flex"
  >
    <Empty.Root class="h-115">
      <Empty.Header>
        <Empty.Media variant="icon">
          <ListMusic />
        </Empty.Media>
        <Empty.Title>No tracks</Empty.Title>
        <Empty.Description>Add a track to get started.</Empty.Description>
      </Empty.Header>
      <Empty.Content>
        <Button onclick={addTrackWithLastTrackType}>Add an audio track</Button>
      </Empty.Content>
    </Empty.Root>
  </button>
{/if}
