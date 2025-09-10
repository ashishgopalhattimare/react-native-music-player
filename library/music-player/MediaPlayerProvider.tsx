import React, { FC, PropsWithChildren, useCallback, useRef, useState } from 'react';
import { Video } from 'react-native-video';

import { Track } from '@/api/types';
import { StyleSheet } from 'react-native';
import { MediaPlayerContext } from './hooks/use-media-player';

type Props = {};

export const MediaPlayerProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  
  const audioRef = useRef(null);

  const [track, setTrack] = useState<Track | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(true);

  const onPauseHandler = useCallback(() => {
    setIsPaused(true);
  }, []);

  const onResumeHandler = useCallback(() => {
    setIsPaused(false);
  }, []);

  const onPlayHandler = useCallback(
    (track: Track) => {
      const mediaPlayer = audioRef.current;
      if (!mediaPlayer) {
        return;
      }
      setTrack(track);
      setIsPaused(true);

      setTimeout(() => onResumeHandler(), 100);
    },
    [onResumeHandler],
  );

  const value = {
    play: onPlayHandler,
    pause: onPauseHandler,
    resume: onResumeHandler,
    track,
    isPaused: isPaused,
  };

  return (
    <MediaPlayerContext.Provider value={value}>
      <Video
        source={{ uri: track?.url }}
        ref={audioRef}
        style={styles.video}
        controls={true}
        paused={isPaused}
      />
      {children}
    </MediaPlayerContext.Provider>
  );
};

const styles = StyleSheet.create({
  video: {
    display: 'none',
  },
});
