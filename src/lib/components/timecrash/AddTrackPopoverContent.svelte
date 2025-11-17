<script lang="ts">
  import * as Popover from "$lib/components/ui/popover/index.js";
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
  import Input from "$lib/components/ui/input/input.svelte";
  import { buttonVariants } from "$lib/components/ui/button/index.js";

  import { trackTypeNames, trackTemplates } from "$lib/";

  let {
    baseTrackAddAmount = $bindable(),
    baseTrackType = $bindable(),
    addTracks,
  } = $props();
</script>

<Popover.Content>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex items-center gap-2">
      <label class="font-medium" for="baseTrackAddAmount">Add</label>
      <Input
        id="baseTrackAddAmount"
        bind:value={baseTrackAddAmount}
        placeholder="Number of Tracks to Add Per Type"
        type="number"
        min="1"
        step="1"
        class="w-20"
      ></Input>
      <label class="font-medium" for="baseTrackAddAmount"
        >track{baseTrackAddAmount > 1 ? "s" : ""} per type</label
      >
    </div>
    <ToggleGroup.Root type="multiple" bind:value={baseTrackType} class="w-full">
      {#each Object.keys(trackTemplates) as trackType (trackType)}
        <ToggleGroup.Item value={trackType} class="flex-1 text-center"
          >{trackTypeNames[trackType]}</ToggleGroup.Item
        >
      {/each}
    </ToggleGroup.Root>
    <Popover.Trigger
      id="addTracksButton"
      class={buttonVariants({ variant: "default" })}
      onclick={addTracks}>Add</Popover.Trigger
    >
  </div>
</Popover.Content>
