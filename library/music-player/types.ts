import { Track } from '@/api/types';

export type VolumeState = 'plus' | 'minus';
export type AudioStats = {
  positionMillis: number;
  durationMillis: number | undefined;
};
export type AudioDataType = {
  isPlaying: boolean;
  volume: number;
  isLooping: boolean;
};
export type MediaPlayerContextProps = {
  play: (track: Track) => void;
  pause: () => void;
  resume: () => void;
  setVolume: (state: VolumeState, value?: number) => void;
  track: Track | null;
  isPaused: boolean;
  volume: number;
  isLooping: boolean;
  toggleLooping?: () => void;
  getAudioStats: () => AudioStats | null;
};
