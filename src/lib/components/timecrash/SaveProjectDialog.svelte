<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  let {
    open = $bindable(),
    bundleMediaFiles = $bindable(),
    saveProject,
  } = $props();

  let saveButton: HTMLButtonElement | null = $state(null);

  $effect(() => {
    if (open && saveButton) {
      // saveButton.focus(); // this doesn't work for some reason
    }
  });
</script>

<Dialog.Root bind:open>
  <Dialog.Content>
    <Dialog.Header>Save Project</Dialog.Header>
    <div class="flex gap-2">
      <Checkbox id="saveViewOptions" bind:checked={bundleMediaFiles} />
      <Label for="saveViewOptions">Bundle media files</Label>
    </div>
    <div class="flex gap-2">
      <Checkbox id="saveViewOptions" checked={true} />
      <Label for="saveViewOptions">Save View Options</Label>
    </div>
    <div class="flex gap-2">
      <Checkbox id="savePalettes" checked={true} />
      <Label for="savePalettes">Save Custom Color Palettes</Label>
    </div>
    <Button bind:this={saveButton} onclick={saveProject}>Save</Button>
  </Dialog.Content>
</Dialog.Root>
