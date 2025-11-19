<script lang="ts">
  import * as Popover from "$lib/components/ui/popover/index.js";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import { Switch } from "$lib/components/ui/switch/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import CustomColorPicker from "svelte-awesome-color-picker";
  import Window from "$lib/components/timecrash/Window.svelte";

  import { SwatchBook, ClipboardCopy } from "@lucide/svelte";

  import colors from "$lib/colors.ts";

  let {
    value = $bindable(),
    open = $bindable(false),
    withButton = true,
    title = "Color Picker",
    buttonVariant = "timecrashTopButtons",
    big = false,
    contentOnly = false,
    forPickingValue = false,
  } = $props();

  let compactMode = $state(false);

  open = true;

  let selectedPalette = $state(Object.keys(colors)[0]);
</script>

{#snippet bigContent()}
  <div class="flex flex-col gap-4">
    <span class="text-xl font-bold">{title}</span>
    <div class="flex items-center justify-between">
      <span class="font-semibold text-lg">Palettes</span>
      <div class="flex gap-2 items-center">
        <Label for="compactMode">Compact Mode</Label>
        <Switch id="compactMode" bind:checked={compactMode} />
      </div>
    </div>
    <Tabs.Root bind:value={selectedPalette}>
      <Tabs.List class="gap-1">
        <Tabs.Trigger value="yourPalettes">Your Palettes</Tabs.Trigger>
        {#each Object.keys(colors) as palette (palette)}
          {@const thisPalette = colors[palette]}
          <Tabs.Trigger value={palette}>
            {thisPalette.name}
          </Tabs.Trigger>
        {/each}
      </Tabs.List>
      <Tabs.Content value="yourPalettes">
        <div class="dark">
          <CustomColorPicker label="Add a Color" />
        </div>
      </Tabs.Content>
      {#each Object.keys(colors) as palette (palette)}
        <Tabs.Content value={palette}>
          <ScrollArea class="h-140">
            {@const thisPalette = colors[palette]}
            <div class="flex flex-col items-center">
              <div class="flex flex-col" class:gap-2={!compactMode}>
                {#if thisPalette.shadeNames}
                  <div class="flex ml-27" class:gap-2={!compactMode}>
                    {#each thisPalette.shadeNames as shadeName (thisPalette.name + shadeName)}
                      <span
                        class="w-{compactMode ? '4' : '10'} text-center"
                        class:text-xs={compactMode}>{shadeName}</span
                      >
                    {/each}
                  </div>
                {/if}
                <Tooltip.Provider delayDuration={400}>
                  {#each Object.keys(thisPalette.colors) as color (color)}
                    {@const colorNameTitleCase =
                      color[0].toUpperCase() + color.slice(1)}
                    <div class="flex" class:gap-2={!compactMode}>
                      <span
                        class="flex items-center w-25"
                        class:text-xs={compactMode}>{colorNameTitleCase}</span
                      >
                      {#each thisPalette.colors[color] as shade, shadeIndex (thisPalette.name + color + shade)}
                        <Tooltip.Root>
                          <Tooltip.Trigger>
                            <ContextMenu.Root>
                              <ContextMenu.Trigger
                                class="w-{compactMode
                                  ? '5'
                                  : '10'} h-{compactMode
                                  ? '5'
                                  : '10'} shadow-md {compactMode
                                  ? ''
                                  : 'rounded-sm'}"
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
                                  onclick={() =>
                                    navigator.clipboard.writeText(shade)}
                                  ><ClipboardCopy />Copy in Native</ContextMenu.Item
                                >
                              </ContextMenu.Content>
                            </ContextMenu.Root>
                          </Tooltip.Trigger>
                          <Tooltip.Content class="flex flex-col items-center">
                            <p>
                              {colorNameTitleCase}
                              {thisPalette.shadeNames[shadeIndex]}
                            </p>
                            <p class="font-mono">{shade}</p>
                          </Tooltip.Content>
                        </Tooltip.Root>
                      {/each}
                    </div>
                  {/each}
                </Tooltip.Provider>
              </div>
            </div>
          </ScrollArea>
        </Tabs.Content>
      {/each}
    </Tabs.Root>
  </div>
{/snippet}

{#snippet smallContent()}
  <Tabs.Root bind:value={selectedPalette}></Tabs.Root>
{/snippet}

{#if big}
  {#if contentOnly}
    {@render bigContent()}
  {:else}
    {#if withButton}
      <Button variant="timecrashTopButtons" onclick={() => (open = !open)}>
        <SwatchBook />
      </Button>
    {/if}
    {#if open}
      <Window {title}>
        {@render bigContent()}
      </Window>
    {/if}
  {/if}
{:else if withButton}
  <Popover.Root bind:open>
    <Popover.Trigger
      class={buttonVariants({ variant: buttonVariant })}
      aria-label="Select Color"
    >
      <SwatchBook />
    </Popover.Trigger>
    {@render smallContent()}
  </Popover.Root>
{:else}
  {@render smallContent()}
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
