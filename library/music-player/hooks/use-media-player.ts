import { createContext, useContext } from 'react';

import { Track } from '@/api/types';
import { MediaPlayerContextProps } from '../types';

export const MediaPlayerContext = createContext<MediaPlayerContextProps>({
  play: (_: Track) => Promise.resolve(),
  pause: () => undefined,
  resume: () => undefined,
  track: null,
  isPaused: false,
  getAudioStats: () => null,
  setVolume: () => undefined,
  volume: 1,
});

export const useMediaPlayer = () => useContext(MediaPlayerContext);
