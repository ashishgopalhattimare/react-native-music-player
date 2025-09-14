import { StyleSheet, TouchableOpacity, View } from '@/components/react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useMediaPlayer } from '@/library/music-player';
import { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { useTheme } from '@/hooks/useThemeColor';
import { Volume } from './volume';

type Props = {
  style?: StyleProp<ViewStyle>;
};
export const Controller: FC<Props> = ({ style }) => {
  const { pause, resume, isPaused, isLooping, toggleLooping, updateSongPosition } =
    useMediaPlayer();
  const theme = useTheme();

  const onForwardHandler = () => updateSongPosition('forward');
  const onBackHandler = () => updateSongPosition('back');

  return (
    <View style={[styles.container, style]}>
      <View style={styles.controller}>
        <TouchableOpacity onPress={onBackHandler}>
          <IconSymbol color="white" size={25} name="backward" />
        </TouchableOpacity>
        <TouchableOpacity onPress={isPaused ? resume : pause}>
          <IconSymbol color="white" size={30} name={isPaused ? 'pause' : 'play'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onForwardHandler}>
          <IconSymbol color="white" size={25} name="forward" />
        </TouchableOpacity>
      </View>
      <Volume />
      <TouchableOpacity onPress={toggleLooping}>
        <IconSymbol color={isLooping ? theme.tint : theme.tabIconDefault} size={25} name="repeat" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
  },
  controller: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
});
