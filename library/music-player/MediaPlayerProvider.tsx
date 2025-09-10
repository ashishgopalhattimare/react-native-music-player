import { Audio } from 'expo-av';
import React, { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';

import { Track } from '@/api/types';
import { StyleSheet } from 'react-native';
import { MediaPlayerContext } from './hooks/use-media-player';

type Props = {};

export const MediaPlayerProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const [track, setTrack] = useState<Track | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(true);

  const load = async (uri: string, shouldPlay: boolean = true) => {
    const { sound } = await Audio.Sound.createAsync({ uri: uri }, { shouldPlay: shouldPlay });
    setSound(sound);
    setIsPaused(!shouldPlay);

    sound.setOnPlaybackStatusUpdate((status) => {
      console.log(status);
    });
  };

  const onPauseHandler = useCallback(async () => {
    setIsPaused(true);
    await sound?.pauseAsync();
  }, [sound]);

  const onResumeHandler = useCallback(async () => {
    setIsPaused(false);
    await sound?.playAsync();
  }, []);

  const onPlayHandler = useCallback(async (track: Track) => {
    setTrack(track);
    await load(track.url);
  }, []);

  // Unload sound when component unmounts
  useEffect(() => {
    return () => {
      sound?.unloadAsync();
    };
  }, [sound]);

  const value = {
    play: onPlayHandler,
    pause: onPauseHandler,
    resume: onResumeHandler,
    track,
    isPaused: isPaused,
  };

  return <MediaPlayerContext.Provider value={value}>{children}</MediaPlayerContext.Provider>;
};

const styles = StyleSheet.create({
  video: {
    display: 'none',
  },
});
