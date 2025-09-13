import { Audio } from 'expo-av';
import React, { FC, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';

import { Track } from '@/api/types';
import { MediaPlayerContext } from './hooks/use-media-player';
import type { AudioDataType, AudioStats, MediaPlayerContextProps, VolumeState } from './types';

type Props = {};

const DEFAULT_AUDIO_STATS: AudioStats = { positionMillis: 0, durationMillis: 0 };
const DEFAULT_AUDIO_DATA: AudioDataType = {
  isPlaying: false,
  volume: 1,
  isLooping: false,
};
const DEFAULT_VOLUME = 0.5;

export const MediaPlayerProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const audioStats = useRef<AudioStats>(DEFAULT_AUDIO_STATS);

  const [track, setTrack] = useState<Track | null>(null);

  const [audioData, setAudioData] = useState(DEFAULT_AUDIO_DATA);

  useEffect(() => {
    const load = async (track: Track, shouldPlay: boolean = true, millis: number = 0) => {
      audioStats.current = {
        positionMillis: millis,
        durationMillis: -1,
      };

      const { sound } = await Audio.Sound.createAsync(
        { uri: track.url },
        {
          shouldPlay: shouldPlay,
          isLooping: false,
          positionMillis: millis,
          volume: DEFAULT_VOLUME,
        },
      );
      setSound(sound);
      setAudioData((prev) => ({ ...prev, isPlaying: true }));
    };

    if (track) load(track, true, 0);
  }, [track]);

  // Unload sound when component unmounts
  useEffect(() => {
    if (!sound) return;

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded) {
        audioStats.current = {
          positionMillis: status.positionMillis,
          durationMillis: status.durationMillis,
        };
      }
    });
    return () => {
      sound.unloadAsync();
    };
  }, [sound]);

  const onPauseHandler = useCallback(async () => {
    if (!sound) return;

    setAudioData((prev) => ({
      ...prev,
      isPlaying: false,
    }));
    await sound.pauseAsync();
  }, [sound]);

  const onVolumeHandler = useCallback(
    (state: VolumeState, volume?: number) => {
      if (!sound) return;

      sound.getStatusAsync().then(async (status) => {
        if (!status.isLoaded) return;

        let updatedVolume = status.volume;
        if (volume !== undefined) {
          updatedVolume = volume;
        } else if (state === 'plus') {
          updatedVolume = Math.min(1, updatedVolume + 0.1);
        } else {
          updatedVolume = Math.max(0, updatedVolume - 0.1);
        }

        await sound.setVolumeAsync(updatedVolume);
        setAudioData((prev) => ({
          ...prev,
          volume: updatedVolume,
        }));
      });
    },
    [sound],
  );

  const onResumeHandler = useCallback(async () => {
    if (!sound) return;

    const status = await sound.getStatusAsync();
    if (status.isLoaded) {
      await sound.playAsync();
      setAudioData((prev) => ({
        ...prev,
        isPlaying: true,
      }));
    }
  }, [sound]);

  const onPlayHandler = useCallback(
    async (_track: Track) => {
      if (_track.url === track?.url) {
        return;
      }
      setTrack(_track);
    },
    [track],
  );

  const getAudioStats = useCallback(() => audioStats.current, []);
  const toggleLooping = useCallback(() => {
    setAudioData((prev) => {
      const isLooping = !prev.isLooping;
      sound?.setIsLoopingAsync(isLooping);
      return {
        ...prev,
        isLooping: isLooping,
      };
    });
  }, [sound]);

  const value: MediaPlayerContextProps = {
    play: onPlayHandler,
    pause: onPauseHandler,
    resume: onResumeHandler,
    track,
    isPaused: !audioData.isPlaying,
    getAudioStats,
    setVolume: onVolumeHandler,
    volume: audioData.volume,
    isLooping: audioData.isLooping,
    toggleLooping,
  };

  return <MediaPlayerContext.Provider value={value}>{children}</MediaPlayerContext.Provider>;
};
