export type TrackType = "audio" | "video" | "midi";

export type Waveform = {
  container: HTMLElement;
  waveColor: string;
  progressColor: string;
  url: string;
};

export type MediaItem = {
  id: string;
  name: string;
  type: string;
  size: number;
  lastModified: number;
  file?: File;
  blob?: Blob;
  available: boolean;
};

export interface AudioMediaItem extends MediaItem {
  channelCount: number;
  waveform: Waveform;
}

export type Clip = {
  id: string;
  mediaItemId: string;
  name: string;
  inTrackStart: number;
  inMediaStart: number;
  inMediaEnd: number;
  speed: number;
};

export type TrackTemplate = {
  id?: string;
  name: string;
  type: TrackType;
  height: number;
  gain?: number;
  opacity?: number;
  soloMute?: [string, string];
};

export interface TrackLike extends TrackTemplate {
  id: string;
  clips: Clip[];
}

export type TimeSignature = [number, number];

export type Playhead = {
  pos: number;
  playing: boolean;
  recording: boolean;
  speed: number;
  exists: boolean;
};

export type ProjectTemplate = {
  id?: string;
  templateName?: string;
  tracks: TrackLike[];
  baseTrackHeight: number;
  baseTrackType: TrackType[];
  baseTrackAddAmount: number;
  timeSignature: TimeSignature;
  bpm: number;
  playhead: Playhead;
  timelineLength: number;
};

export interface Project extends ProjectTemplate {
  id: string;
}

export type CommandLike = {
  key?: string;
  ctrl?: boolean;
  alt?: boolean;
  icon?: string;
  action: () => void;
};

export type Client = {
  id: string;
  title: string;
  resizable: boolean;
  draggable: boolean;
  dragging?: boolean;
  closeable?: boolean;
};
