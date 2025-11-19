<script lang="ts">
  import * as Popover from "$lib/components/ui/popover/index.js";
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import { Switch } from "$lib/components/ui/switch/index.js";
  import { Slider } from "$lib/components/ui/slider/index.js";
  import CustomColorPicker from "svelte-awesome-color-picker";
  import Window from "$lib/components/timecrash/Window.svelte";

  import { Scaling, SwatchBook, ClipboardCopy } from "@lucide/svelte";

  import colors from "$lib/colors.ts";
  import Label from "../ui/label/label.svelte";

  let {
    value = $bindable(),
    open = $bindable(false),
    withButton = true,
    title = "Color Picker",
    buttonVariant = "timecrashTopButtons",
    big = false,
    contentOnly = false,
  } = $props();

  // min 0, max 2
  let density: number = $state(0);

  // Configuration for table density
  const densities = [
    {
      cellPadding: "p-0", // Tighter cell spacing
      shadeNameTextSize: "text-xs",
      colorNameTextSize: "text-xs",
      swatchDimensions: "w-5 h-5",
      swatchRounding: "rounded-none",
    },
    {
      cellPadding: "p-1",
      shadeNameTextSize: "text-xs",
      colorNameTextSize: "text-sm",
      swatchDimensions: "w-6 h-6",
      swatchRounding: "rounded-sm",
    },
    {
      cellPadding: "p-2",
      shadeNameTextSize: "text-sm",
      colorNameTextSize: "text-base",
      swatchDimensions: "w-8 h-8",
      swatchRounding: "rounded-md",
    },
  ];

  let compactMode: boolean = $state(density === 0);

  $effect(() => {
    if (compactMode) {
      density = 0;
    } else {
      density = 1;
    }
  });

  open = true;

  let selectedPalette = $state(Object.keys(colors)[0]);
</script>

{#snippet bigContent()}
  <div class="flex flex-col gap-4">
    <span class="text-xl font-bold">{title}</span>
    <div class="flex items-center justify-between">
      <span class="font-semibold text-lg">Palettes</span>
      <Label for="compactMode">Compact Mode</Label>
      <Switch bind:checked={compactMode} id="compactMode" />
    </div>
    <!-- <div class="flex items-center gap-3">
      <Scaling size={20} />
      <Slider type="single" min={0} max={2} bind:value={density} class="w-40"
      ></Slider>
    </div> -->
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
          <ScrollArea class="h-140 rounded-md border">
            {@const thisPalette = colors[palette]}

            <div class="w-full">
              <table class="w-full border-collapse text-left">
                <thead class="bg-muted/50 sticky top-0 z-10 backdrop-blur-sm">
                  <tr>
                    <th class="p-2"></th>
                    {#if thisPalette.shadeNames}
                      {#each thisPalette.shadeNames as shadeName (thisPalette.name + shadeName)}
                        <th
                          class="{densities[density]
                            .cellPadding} text-center font-medium text-muted-foreground {densities[
                            density
                          ].shadeNameTextSize}"
                        >
                          {shadeName}
                        </th>
                      {/each}
                    {/if}
                  </tr>
                </thead>

                <tbody>
                  <Tooltip.Provider delayDuration={400}>
                    {#each Object.keys(thisPalette.colors) as color (color)}
                      {@const colorNameTitleCase =
                        color[0].toUpperCase() + color.slice(1)}

                      <tr class="hover:bg-muted/30 transition-colors">
                        <td
                          class="{densities[density]
                            .cellPadding} pr-4 font-medium whitespace-nowrap {densities[
                            density
                          ].colorNameTextSize}"
                        >
                          {colorNameTitleCase}
                        </td>

                        {#each thisPalette.colors[color] as shade, shadeIndex (thisPalette.name + color + shade)}
                          <td
                            class="{densities[density].cellPadding} text-center"
                          >
                            <div class="flex items-center justify-center">
                              <Tooltip.Root>
                                <Tooltip.Trigger>
                                  <ContextMenu.Root>
                                    <ContextMenu.Trigger
                                      class="{densities[density]
                                        .swatchDimensions} shadow-sm border border-transparent hover:border-foreground/20 transition-all {densities[
                                        density
                                      ].swatchRounding}"
                                      style="background-color: {shade};"
                                    ></ContextMenu.Trigger>
                                    <ContextMenu.Content>
                                      <ContextMenu.Item
                                        ><ClipboardCopy
                                          class="mr-2 h-4 w-4"
                                        />Copy in HEX</ContextMenu.Item
                                      >
                                      <ContextMenu.Item
                                        ><ClipboardCopy
                                          class="mr-2 h-4 w-4"
                                        />Copy in RGB</ContextMenu.Item
                                      >
                                      <ContextMenu.Item
                                        ><ClipboardCopy
                                          class="mr-2 h-4 w-4"
                                        />Copy in HSL</ContextMenu.Item
                                      >
                                      <ContextMenu.Item
                                        ><ClipboardCopy
                                          class="mr-2 h-4 w-4"
                                        />Copy in HSV</ContextMenu.Item
                                      >
                                      <ContextMenu.Item
                                        ><ClipboardCopy
                                          class="mr-2 h-4 w-4"
                                        />Copy in CMYK</ContextMenu.Item
                                      >
                                      <ContextMenu.Item
                                        ><ClipboardCopy
                                          class="mr-2 h-4 w-4"
                                        />Copy in oklch</ContextMenu.Item
                                      >
                                      <ContextMenu.Item
                                        onclick={() =>
                                          navigator.clipboard.writeText(shade)}
                                      >
                                        <ClipboardCopy
                                          class="mr-2 h-4 w-4"
                                        />Copy in Native
                                      </ContextMenu.Item>
                                    </ContextMenu.Content>
                                  </ContextMenu.Root>
                                </Tooltip.Trigger>
                                <Tooltip.Content
                                  class="flex flex-col items-center"
                                >
                                  <p>
                                    {colorNameTitleCase}
                                    {thisPalette.shadeNames[shadeIndex]}
                                  </p>
                                  <p class="font-mono text-xs">{shade}</p>
                                </Tooltip.Content>
                              </Tooltip.Root>
                            </div>
                          </td>
                        {/each}
                      </tr>
                    {/each}
                  </Tooltip.Provider>
                </tbody>
              </table>
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
