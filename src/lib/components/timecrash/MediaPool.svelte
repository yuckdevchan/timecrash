<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Slider } from "$lib/components/ui/slider/index.js";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  import NoMedia from "$lib/components/timecrash/NoMedia.svelte";
  import AddTrackPopover from "$lib/components/timecrash/AddTrackPopover.svelte";

  import { formatUnixTimestamp } from "$lib/timecrash/utils.ts";
  import type { MediaItem } from "$lib/timecrash/index.d.ts";

  import {
    FilePlay,
    Scaling,
    Import,
    Plus,
    Pencil,
    Trash2,
    ListEnd,
  } from "@lucide/svelte";
  import Input from "../ui/input/input.svelte";

  let {
    tracks = $bindable(),
    baseTrackAddAmount = $bindable(),
    baseTrackType = $bindable(),
    addTracks,
  } = $props();

  let mediaPool = $state([]);
  let selectedFiles = $state([]);
  let mediaPoolDensity = $state(1);

  function updateMediaPool() {
    for (let file of selectedFiles) {
      const mediaItem: MediaItem = {
        id: crypto.randomUUID(),
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        file: file,
      };
      mediaPool.push(mediaItem);
    }
    selectedFiles = new DataTransfer().files;
  }

  function removeFromMediaPool(fileId: string) {
    mediaPool = mediaPool.filter((file) => file.id !== fileId);
  }

  function enableRenaming(fileId: string) {
    const file = mediaPool.find((file) => file.id === fileId);
    if (file) {
      file.renaming = true;
    }
  }

  function addClipToTrack(fileId: string, trackId: string) {
    const file = mediaPool.find((file) => file.id === fileId);
    const track = tracks.find((track) => track.id === trackId);
    track.clips.push({
      id: crypto.randomUUID(),
      mediaItem: file,
      inTrackStart: 0,
      inMediaStart: 0,
      inMediaEnd: 10,
      speed: 1,
    });
  }
</script>

<Input
  type="file"
  accept="audio/*,video/*,image/*"
  multiple
  class="hidden"
  bind:files={selectedFiles}
  onchange={updateMediaPool}
  id="fileSelector"
/>

<div class="h-9 flex items-center">
  <h2 class="pl-3 font-medium">Media Pool</h2>
</div>
<div class="flex w-full dark:bg-zinc-900 bg-zinc-300">
  <Button
    variant="timecrashTopButtons"
    onclick={() => {
      document.getElementById("fileSelector").click();
    }}
  >
    <Import /> Import Media
  </Button>
</div>

<section class="p-2">
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-3">
      <Scaling size={20} />
      <Slider
        type="single"
        min={0}
        max={6}
        bind:value={mediaPoolDensity}
        class="w-40"
      ></Slider>
    </div>
  </div>
  <div>
    <div class="flex items-center gap-1 p-2 text-zinc-400">
      <div></div>
      <div class="flex w-full items-center justify-between">
        <span>File Name</span>
        <div class="gap-23 flex items-center">
          <span>Type</span>
          <span>Size</span>
          <span>Last Modified</span>
        </div>
      </div>
    </div>
    <ScrollArea class="h-175">
      <NoMedia mediaPoolSize={mediaPool.length} />
      {#each mediaPool as file, index (file.id)}
        <audio src={URL.createObjectURL(file.file)}></audio>
        <ContextMenu.Root>
          <ContextMenu.Trigger>
            <li
              draggable="true"
              class="flex items-center gap-1 p-{mediaPoolDensity} hover:bg-zinc-100 dark:hover:bg-zinc-800"
              class:border-b-2={index != mediaPool.length - 1}
              class:rounded-t-md={index === 0}
              class:rounded-b-md={index === mediaPool.length - 1}
              ondragstart={(e) => {
                e.dataTransfer.setData("text/plain", file.id);
              }}
            >
              <FilePlay size={20} />
              <div class="flex w-full items-center justify-between">
                <div class="flex items-center gap-2">
                  <span>{file.name}</span>
                  <Popover.Root>
                    <Popover.Trigger>
                      <Pencil size={15} />
                    </Popover.Trigger>
                    <Popover.Content>
                      <div class="flex flex-col gap-4">
                        <span>Rename File</span>
                        <Input
                          placeholder={file.name}
                          onchange={(e) => {
                            file.name = e.target.value;
                          }}
                        />
                      </div>
                    </Popover.Content>
                  </Popover.Root>
                </div>
                <div class="flex items-center gap-8">
                  <span class="text-zinc-600">{file.type}</span>
                  <span class="text-zinc-600"
                    >{Math.round(file.size / 1000000, 3)} MB</span
                  >
                  <span class="text-zinc-600"
                    >{formatUnixTimestamp(file.lastModified)}</span
                  >
                </div>
              </div>
            </li>
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Sub>
              <ContextMenu.SubTrigger
                ><ListEnd />Add to track</ContextMenu.SubTrigger
              >
              <ContextMenu.SubContent>
                {#each tracks as track, index (track.id)}
                  <ContextMenu.Item
                    class="flex gap-2"
                    onclick={() => addClipToTrack(file.id, track.id)}
                  >
                    <span class="flex items-center font-mono text-zinc-600"
                      >{index + 1}</span
                    >{track.name}
                  </ContextMenu.Item>
                {/each}
                <ContextMenu.Item
                  onclick={() => {
                    addTracks(null, ["audio"], 1);
                  }}><Plus /> New Track</ContextMenu.Item
                >
              </ContextMenu.SubContent>
            </ContextMenu.Sub>
            <ContextMenu.Item onclick={() => removeFromMediaPool(file.id)}>
              <Trash2 />Remove
            </ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>
      {/each}
    </ScrollArea>
  </div>
</section>
