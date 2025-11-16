<script lang="ts">
  import * as Command from "$lib/components/ui/command/index.js";
  import { toggleMode } from "mode-watcher";

  import type { CommandLike } from "$lib/timecrash/index.d.ts";

  let {
    showMediaPool = $bindable(),
    showCreateProjectDialog = $bindable(),
    autoSizeTracks = $bindable(),
    showCommandRunner = $bindable(),
    startStopRecording,
    playPause,
    rewindPlayhead,
    fastForwardPlayhead,
    saveProject,
    addTrackWithLastTrackType,
    deleteLastTrack,
  } = $props();

  const commands: Record<string, CommandLike> = {
    Rewind: {
      key: "ArrowLeft",
      action: rewindPlayhead,
      closesRunner: false,
    },
    "Fast Forward": {
      key: "ArrowRight",
      action: fastForwardPlayhead,
      closesRunner: false,
    },
    "Play/Pause": {
      key: " ",
      action: playPause,
      closesRunner: false,
    },
    "Start/Stop Recording": {
      action: startStopRecording,
      closesRunner: false,
    },
    "New Project": {
      key: "n",
      ctrl: true,
      action: () => {
        showCreateProjectDialog = true;
      },
    },
    "Toggle Command Runner": {
      key: "k",
      ctrl: true,
      action: () => {
        showCommandRunner = !showCommandRunner;
      },
      closesRunner: false,
    },
    "Toggle Media Pool": {
      action: () => {
        showMediaPool = !showMediaPool;
      },
    },
    "Toggle Theme": {
      action: toggleMode,
    },
    "Toggle Automatic Track Sizing": {
      action: () => {
        autoSizeTracks = !autoSizeTracks;
      },
    },
    "Save Project": {
      action: saveProject,
    },
    "Quick Add New Track": {
      key: "t",
      action: addTrackWithLastTrackType,
    },
    "Quick Delete Last Track": {
      key: "x",
      action: deleteLastTrack,
    },
  };

  function handleKeydown(event: KeyboardEvent) {
    for (const name in commands) {
      const kb = commands[name];
      if (
        event.key === kb.key &&
        (kb.ctrl === undefined ||
          kb.ctrl === event.ctrlKey ||
          kb.ctrl === event.metaKey) &&
        (kb.alt === undefined || kb.alt === event.altKey) &&
        (!showCommandRunner ||
          (event.key === "k" && (event.ctrlKey || event.metaKey)))
      ) {
        event.preventDefault();
        if (kb.closesrunner || kb.closesRunner === undefined) {
          showCommandRunner = false;
        }
        if (kb.action) {
          kb.action();
        }
        break;
      }
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<Command.Dialog bind:open={showCommandRunner}>
  <Command.Input placeholder="Type a command or search..." />
  <Command.List>
    <Command.Empty>No results found.</Command.Empty>
    <Command.Group heading="Settings">
      {#each Object.keys(commands) as command (command)}
        {@const thisCommand = commands[command]}
        <Command.Item onSelect={thisCommand.action}>
          <span>{command}</span>
        </Command.Item>
      {/each}
    </Command.Group>
  </Command.List>
</Command.Dialog>
