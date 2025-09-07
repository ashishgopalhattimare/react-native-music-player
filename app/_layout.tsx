import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { SafeAreaView, StyleSheet } from 'react-native';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

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
      <SafeAreaView style={styles.container}>
        <App />
        <StatusBar style="auto" />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
