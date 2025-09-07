import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { MediaPlayerProvider } from '@/library/music-player';

const App = () => (
  <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  </Stack>
);

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }
  return (
    <ThemeProvider value={DarkTheme}>
      <MediaPlayerProvider>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <App />
            <StatusBar style="auto" />
          </SafeAreaView>
        </SafeAreaProvider>
      </MediaPlayerProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
