<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  let { open = $bindable(false) } = $props();
</script>

<AlertDialog.Root bind:open>
  <AlertDialog.Content class="[&>button:last-child]:hidden">
    <AlertDialog.Header>Resolve Project Conflict</AlertDialog.Header>
    <AlertDialog.Description
      >The opened project conflicts with an existing open project.</AlertDialog.Description
    >
    <Button>Keep existing open project</Button>
    <Button>Keep newly opened project</Button>
    <Button>Keep Both</Button>
    <AlertDialog.Description class="text-center">
      Selecting 'Keep Both' marks the newly opened project as a separate project
      from the existing open project.
    </AlertDialog.Description>
  </AlertDialog.Content>
</AlertDialog.Root>
