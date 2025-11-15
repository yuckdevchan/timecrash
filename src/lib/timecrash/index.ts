import type { ProjectTemplate, Project, TrackTemplate } from './index.d.ts';

export const trackTypeNames: Record<string, string> = {
	audio: 'Audio',
	midi: 'MIDI',
	video: 'Video'
};

export const trackTemplates: Record<string, TrackTemplate> = {
	audio: { name: 'Audio Track', type: 'audio', height: -1, gain: 0, soloMute: [], clips: [] },
	midi: { name: 'MIDI Track', type: 'midi', height: -1, gain: 0, soloMute: [], clips: [] },
	video: { name: 'Video Track', type: 'video', height: -1, opacity: 1, clips: [] }
};

export const projectTemplates: Record<string, ProjectTemplate> = {
	default: {
		templateName: 'Default',
		tracks: [
			{
				id: crypto.randomUUID(),
				name: 'Audio Track 1',
				type: 'audio',
				height: -1,
				gain: 0,
				soloMute: [],
				clips: []
			},
			{
				id: crypto.randomUUID(),
				name: 'Audio Track 2',
				type: 'audio',
				height: -1,
				gain: 0,
				soloMute: [],
				clips: []
			}
		],
		baseTrackHeight: 100,
		baseTrackType: ['audio'],
		baseTrackAddAmount: 1,
		timeSignature: [4, 4],
		bpm: 120,
		playhead: {
			pos: 0,
			playing: false,
			recording: false,
			speed: 1
		}
	}
};

export const projects: Record<string, Project> = {};

export const defaultProjectName = 'Untitled Project';

projects[defaultProjectName] = projectTemplates.default;
projects[defaultProjectName].id = crypto.randomUUID();
