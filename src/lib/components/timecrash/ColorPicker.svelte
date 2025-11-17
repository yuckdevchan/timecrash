<script lang="ts">
  import * as Popover from "$lib/components/ui/popover/index.js";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import CustomColorPicker from "svelte-awesome-color-picker";

  import { SwatchBook, ClipboardCopy } from "@lucide/svelte";

  import colors from "$lib/colors.ts";

  let {
    withButton = true,
    title = "Color Picker",
    buttonVariant = "timecrashTopButtons",
  } = $props();

  let selectedPalette = $state(Object.keys(colors)[0]);
</script>

{#snippet popoverContent()}
  <Popover.Content class="w-180 max-h-200">
    <div class="flex flex-col gap-4">
      <span class="text-xl font-bold">{title}</span>
      <span class="font-semibold text-lg">Swatches</span>
      <Tabs.Root bind:value={selectedPalette}>
        <Tabs.List class="gap-1">
          <Tabs.Trigger value="yourSwatches">Your Swatches</Tabs.Trigger>
          {#each Object.keys(colors) as palette (palette)}
            {@const thisPalette = colors[palette]}
            <Tabs.Trigger value={palette}>
              {thisPalette.name}
            </Tabs.Trigger>
          {/each}
        </Tabs.List>
        <Tabs.Content value="yourSwatches">
          <div class="dark">
            <CustomColorPicker />
          </div>
        </Tabs.Content>
        {#each Object.keys(colors) as palette (palette)}
          <Tabs.Content value={palette}>
            <ScrollArea class="h-150">
              {@const thisPalette = colors[palette]}
              <div class="flex flex-col gap-2 items-center">
                {#if thisPalette.shadeNames}
                  <div class="flex gap-2 ml-20">
                    {#each thisPalette.shadeNames as shadeName (thisPalette.name + shadeName)}
                      <span class="w-10 text-center">{shadeName}</span>
                    {/each}
                  </div>
                {/if}
                {#each Object.keys(thisPalette.colors) as color (color)}
                  <div class="flex gap-2">
                    <span class="flex items-center w-18"
                      >{color[0].toUpperCase()}{color.slice(1)}</span
                    >
                    {#each thisPalette.colors[color] as shade (thisPalette.name + color + shade)}
                      <ContextMenu.Root>
                        <ContextMenu.Trigger
                          class="w-10 h-10 rounded-sm"
                          style="background-color: {shade};"
                        ></ContextMenu.Trigger>
                        <ContextMenu.Content>
                          <ContextMenu.Item
                            ><ClipboardCopy />Copy in HEX</ContextMenu.Item
                          >
                          <ContextMenu.Item
                            ><ClipboardCopy />Copy in RGB</ContextMenu.Item
                          >
                          <ContextMenu.Item
                            ><ClipboardCopy />Copy in HSL</ContextMenu.Item
                          >
                          <ContextMenu.Item
                            ><ClipboardCopy />Copy in HSV</ContextMenu.Item
                          >
                          <ContextMenu.Item
                            ><ClipboardCopy />Copy in CMYK</ContextMenu.Item
                          >
                          <ContextMenu.Item
                            ><ClipboardCopy />Copy in oklch</ContextMenu.Item
                          >
                          <ContextMenu.Item
                            ><ClipboardCopy />Copy in Native</ContextMenu.Item
                          >
                        </ContextMenu.Content>
                      </ContextMenu.Root>
                    {/each}
                  </div>
                {/each}
              </div>
            </ScrollArea>
          </Tabs.Content>
        {/each}
      </Tabs.Root>
    </div>
  </Popover.Content>
{/snippet}

{#if withButton}
  <Popover.Root open={true}>
    <Popover.Trigger
      class={buttonVariants({ variant: buttonVariant })}
      aria-label="Select Color"
    >
      <SwatchBook />
    </Popover.Trigger>
    {@render popoverContent()}
  </Popover.Root>
{:else}
  {@render popoverContent()}
{/if}

<style>
  .dark {
    --cp-bg-color: #333;
    --cp-border-color: white;
    --cp-text-color: white;
    --cp-input-color: #555;
    --cp-button-hover-color: #777;
  }
</style>
