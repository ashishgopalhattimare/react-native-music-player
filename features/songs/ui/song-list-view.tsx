import { Image, StyleSheet, Text, View } from '@/components/react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { FontSize } from '@/constants/tokens';
import { useTheme } from '@/hooks/useThemeColor';
import { SongFragment } from '@/types';

type Props = {
  data: SongFragment;
};

const unknownImage = require('@/assets/images/unknown_track.png');

export const SongListView: React.FC<Props> = ({ data }) => {
  const { artwork, title, artist } = data;

  const color = useTheme();
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={artwork ? { uri: artwork } : unknownImage} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.artist} theme="secondary">
          {artist}
        </Text>
      </View>
      <IconSymbol size={16} name="ellipsis" color={color.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  content: {
    flex: 1,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 12,
  },
  title: {
    fontSize: FontSize.SMALL,
    fontWeight: 500,
  },
  artist: {
    fontSize: FontSize.XSMALL,
  },
});
