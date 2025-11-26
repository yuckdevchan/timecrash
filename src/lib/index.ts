import type { ProjectTemplate, Project, TrackTemplate } from "./index.d.ts";

export const trackTypeNames: Record<string, string> = {
  audio: "Audio",
  midi: "MIDI",
  video: "Video",
};

export const trackTemplates: Record<string, TrackTemplate> = {
  audio: {
    name: "Audio Track",
    type: "audio",
    height: -1,
    gain: 0,
    soloMute: [],
    clips: [],
  },
  midi: {
    name: "MIDI Track",
    type: "midi",
    height: -1,
    gain: 0,
    soloMute: [],
    clips: [],
  },
  video: {
    name: "Video Track",
    type: "video",
    height: -1,
    opacity: 1,
    clips: [],
  },
};

export const defaultProjectName = "Untitled Project";

export const projectTemplates: Record<string, ProjectTemplate> = {
  default: {
    name: defaultProjectName,
    templateName: "Default",
    tracks: [
      {
        id: crypto.randomUUID(),
        name: "Audio Track 1",
        type: "audio",
        height: -1,
        gain: 0,
        soloMute: [],
        clips: [],
      },
      {
        id: crypto.randomUUID(),
        name: "Audio Track 2",
        type: "audio",
        height: -1,
        gain: 0,
        soloMute: [],
        clips: [],
      },
    ],
    baseTrackHeight: 100,
    baseTrackType: ["audio"],
    baseTrackAddAmount: 1,
    timeSignature: [4, 4],
    bpm: 120,
    playhead: {
      pos: 0,
      playing: false,
      recording: false,
      speed: 1,
      exists: true,
    },
    timelineLength: 600,
  },
};

export const projects: Record<string, Project> = {};

export const firstProjectId = crypto.randomUUID();
projects[firstProjectId] = projectTemplates.default;
projects[firstProjectId] = { ...projects[firstProjectId], id: firstProjectId };
