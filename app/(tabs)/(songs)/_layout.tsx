import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styles } from '@/styles/common';

const Layout = () => (
  <ThemedView style={styles.container}>
    <ThemedText>Songs</ThemedText>
  </ThemedView>
);

export default Layout;
