import { Button, Image, StyleSheet, Text, View } from '@/components/react-native';
import { FontSize } from '@/constants/tokens';
import { unknownImage } from '@/features/songs/ui/common';
import { useTheme } from '@/hooks/useThemeColor';
import { useMediaPlayer } from '@/library/music-player';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { PlayerController, ProgressBar } from '@/features/player';

const BottomSheetBar = () => (
  <View style={styles.barContainer}>
    <View style={[styles.bar, { backgroundColor: useTheme().tabIconDefault }]} />
  </View>
);

export default function Player() {
  const { track, isPaused, getAudioStats } = useMediaPlayer();
  const router = useRouter();

  const [metadata, setMetadata] = useState<{ position: number; duration?: number }>();

  const onHomeNavigate = () => router.navigate('/');

  if (!track) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <Button onPress={onHomeNavigate} title="Go to Home" />
      </View>
    );
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const stats = getAudioStats();
      if (stats) {
        setMetadata(() => ({
          duration: stats.durationMillis,
          position: stats.positionMillis,
        }));
      }
    }, 300);
    return () => {
      clearInterval(timer);
    };
  }, [isPaused, getAudioStats]);

  const { artwork, title, artist } = track;
  return (
    <View style={styles.container}>
      <BottomSheetBar />
      <View style={{ flex: 1 }}>
        <Image style={styles.image} source={artwork ? { uri: artwork } : unknownImage} />
        <View style={styles.details}>
          <Text style={styles.title}>{title}</Text>
          {artist && <Text style={styles.artist}>{artist}</Text>}

          {metadata?.duration && (
            <ProgressBar
              elapsedTime={metadata.position}
              totalTime={metadata.duration}
              style={styles.progressBar}
            />
          )}

          <PlayerController style={styles.controls} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    gap: 16,
    padding: 16,
  },
  barContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  bar: {
    width: 16 * 5,
    height: 16,
    borderRadius: 50,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  details: {
    marginTop: 20,
  },
  title: {
    fontWeight: 700,
    fontSize: FontSize.LARGE,
  },
  artist: {
    fontWeight: 300,
  },
  controls: { marginTop: 32 },
  progressBar: { marginTop: 32 },
});
