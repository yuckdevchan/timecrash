<script lang="ts">
  import { ModeWatcher } from "mode-watcher";
  import { Toaster } from "$lib/components/ui/sonner/index.js";

  let { children } = $props();

  import "./style.css";
  import "$lib/assets/css/app.css";
</script>

<svelte:head>
  <link rel="manifest" href="/manifest.json" />
</svelte:head>

<ModeWatcher />
<main class="h-[92vh] min-h-[92vh]">
  {@render children()}
</main>
