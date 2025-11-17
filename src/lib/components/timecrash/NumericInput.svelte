<script lang="ts">
  import { Input } from "$lib/components/ui/input/index.js";

  let {
    value = $bindable(),
    min = 0,
    max = 100,
    step = 1,
    plus = false,
  } = $props();

  let inputValue = $state(0);
</script>

<Input
  bind:value
  {min}
  {max}
  {step}
  type="number"
  class="numeric-input h-auto w-auto appearance-none rounded-none border-none p-0 font-mono focus:outline-none"
  style="background-color: transparent"
/>
