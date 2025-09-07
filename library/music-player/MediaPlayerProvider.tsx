import React, { FC, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { Video } from 'react-native-video';
import shaka from 'shaka-player';

import { Track } from '@/api/types';
import { Platform, StyleSheet } from 'react-native';
import { MediaPlayerContext } from './hooks/use-media-player';

type MusicControllerProps = {
  load: (url: string) => Promise<void>;
  destroy: () => void;
  play: () => Promise<void>;
  pause: () => Promise<void>;
};
type Props = {};

export const MediaPlayerProvider: FC<PropsWithChildren<Props>> = ({ children }) => {
  const audioRef = useRef<HTMLVideoElement>(null);
  const musicRef = useRef<MusicControllerProps>(null);

  const [track, setTrack] = useState<Track | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(true);

  const onPauseHandler = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPaused(true);
    }
  }, []);

  const onResumeHandler = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPaused(false);
    }
  }, []);

  const onPlayHandler = useCallback(
    (track: Track) => {
      const mediaPlayer = musicRef.current;
      if (!mediaPlayer) {
        return;
      }
      setIsPaused(true);
      setTrack(track);
      try {
        mediaPlayer.load(track.url).then(async () => {
          onResumeHandler();
        });
      } catch (error) {
        console.error(error);
      }
    },
    [onResumeHandler],
  );

  useEffect(() => {
    const player = new shaka.Player(audioRef.current);
    musicRef.current = player;
    return () => {
      player.destroy();
    };
  }, []);

  const value = {
    play: onPlayHandler,
    pause: onPauseHandler,
    resume: onResumeHandler,
    track,
    isPaused: isPaused,
  };

  return (
    <MediaPlayerContext.Provider value={value}>
      {Platform.select({
        ios: <Video ref={audioRef as never} style={styles.video} />,
        android: <Video ref={audioRef as never} style={styles.video} />,
        default: <video ref={audioRef as never} controls style={styles.video} />,
      })}
      {children}
    </MediaPlayerContext.Provider>
  );
};

const styles = StyleSheet.create({
  video: {
    display: 'none',
  },
});
