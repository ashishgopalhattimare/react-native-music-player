import { StyleSheet, TouchableOpacity, View } from '@/components/react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/hooks/useThemeColor';
import { useMediaPlayer } from '@/library/music-player';

export const Volume = () => {
  const { volume, setVolume } = useMediaPlayer();
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setVolume('minus')}>
        <IconSymbol color={'white'} size={25} name="speaker.minus" />
      </TouchableOpacity>
      <View style={[styles.volumeContainer, { backgroundColor: theme.tabIconDefault }]}>
        <View style={[styles.bar, { backgroundColor: theme.tint, width: `${volume * 100}%` }]} />
      </View>
      <TouchableOpacity onPress={() => setVolume('plus')}>
        <IconSymbol color={'white'} size={25} name="speaker.plus" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  volumeContainer: {
    height: 5,
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: 'red',
  },
});
