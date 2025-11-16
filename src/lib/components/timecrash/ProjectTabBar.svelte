<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";

  import { Plus } from "@lucide/svelte";

  let {
    projects,
    projectTemplates,
    createProject,
    newProjectName = $bindable(),
    newProjectTemplate = $bindable(),
    showCreateProjectDialog = $bindable(),
  } = $props();
</script>

<Tabs.List class="rounded-none bg-transparent h-9">
  {#each Object.keys(projects) as project (projects[project].id)}
    <Tabs.Trigger value={projects[project].id}
      >{projects[project].name}</Tabs.Trigger
    >
  {/each}
  <Dialog.Root bind:open={showCreateProjectDialog}>
    <Dialog.Trigger
      class="hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 ml-1 flex h-full w-8 items-center justify-center rounded-sm"
      ><Plus /></Dialog.Trigger
    >
    <Dialog.Content>
      <Dialog.Header>New Project</Dialog.Header>
      <label for="projectName">Project Name</label>
      <Input
        id="projectName"
        placeholder="Untitled Project"
        bind:value={newProjectName}
        onkeypress={(e) => {
          if (e.key === "Enter") {
            createProject();
          }
        }}
      ></Input>
      <label for="templateSelect">Template</label>
      <Select.Root type="single" bind:value={newProjectTemplate}>
        <Select.Trigger
          class="w-full"
          onkeypress={(e) => {
            if (e.key === "Enter") {
              createProject();
            }
          }}>{newProjectTemplate}</Select.Trigger
        >
        <Select.Content>
          {#each Object.keys(projectTemplates) as template (template)}
            <Select.Item value={template}
              >{projectTemplates[template].templateName}</Select.Item
            >
          {/each}
        </Select.Content>
      </Select.Root>
      <label for="bpm">BPM</label>
      <Input
        id="bpm"
        placeholder="Beats per minute"
        onkeypress={(e) => {
          if (e.key === "Enter") {
            createProject();
          }
        }}
      ></Input>
      <Button type="submit" onclick={createProject}>Create</Button>
    </Dialog.Content>
  </Dialog.Root>
</Tabs.List>
