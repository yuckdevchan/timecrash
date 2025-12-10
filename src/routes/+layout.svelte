<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import { Toaster } from "$lib/components/ui/sonner/index.js";

  let { children } = $props();

  import "./style.css";
  import "$lib/app.css";
</script>

<svelte:head>
  <link rel="manifest" href="/manifest.json" />
</svelte:head>

<Toaster />
<ModeWatcher />

<main class="h-full overflow-y-hidden">
  {@render children()}
</main>
