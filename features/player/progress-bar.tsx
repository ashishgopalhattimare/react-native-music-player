import { StyleSheet, View } from '@/components/react-native';
import { useTheme } from '@/hooks/useThemeColor';
import { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

type ProgressBarProps = { elapsedTime: number; totalTime: number; style?: StyleProp<ViewStyle> };

export const ProgressBar: FC<ProgressBarProps> = ({ elapsedTime, totalTime, style }) => {
  const theme = useTheme();
  const elapsedTimeWidth = (elapsedTime / totalTime) * 100;
  return (
    <View style={[styles.container, { backgroundColor: theme.tabIconDefault }, style]}>
      <View style={[styles.bar, { backgroundColor: theme.tint, width: elapsedTimeWidth }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 8,
    backgroundColor: 'red',
    borderRadius: 8,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: 'green',
  },
});
