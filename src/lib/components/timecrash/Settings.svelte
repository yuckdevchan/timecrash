<script lang="ts">
  import Window from "$lib/components/timecrash/Window.svelte";

  let { open = $bindable(true), commands = $bindable({}) } = $props();

  let title = $state("Settings");
</script>

{#if open}
  <Window {title} bind:open>
    <span class="text-xl font-bold">Settings</span>
    {#each commands as command (command)}
      <p>{command}</p>
    {/each}
  </Window>
{/if}
