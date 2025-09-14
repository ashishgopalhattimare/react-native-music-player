import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { MediaPlayerProvider } from '@/library/music-player';
import { ReduxProvider } from '@/redux/ReduxProvider';
import { FC, PropsWithChildren } from 'react';

const App = () => (
  <Stack initialRouteName="(tabs)">
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen
      name="player"
      options={{
        presentation: 'card',
        gestureEnabled: true,
        gestureDirection: 'vertical',
        animationDuration: 400,
        headerShown: false,
      }}
    />
  </Stack>
);

const Providers: FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider value={DarkTheme}>
    <GestureHandlerRootView>
      <ReduxProvider>
        <MediaPlayerProvider>{children}</MediaPlayerProvider>
      </ReduxProvider>
    </GestureHandlerRootView>
  </ThemeProvider>
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
    <Providers>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <App />
          <StatusBar style="auto" />
        </SafeAreaView>
      </SafeAreaProvider>
    </Providers>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
