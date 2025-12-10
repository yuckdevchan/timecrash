<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";

  let { open = $bindable() } = $props();
</script>

<Dialog.Root bind:open>
  <Dialog.Content>
    <Dialog.Header>About timecrash</Dialog.Header>
    <div>
      <p>
        timecrash is an audio editor that cares. Under heavy development; don't
        expect anything to work!
      </p>
    </div>
  </Dialog.Content>
</Dialog.Root>
