import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const Layout = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarLabelStyle: {
          fontWeight: 500,
        },
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            marginBottom: 8
          },
        }),
      }}
    >
      <Tabs.Screen
        name="(songs)"
        options={{
          title: 'Songs',
          headerShown: false,
          tabBarIcon: ({ color }) => <IconSymbol size={16} name="music.mic" color={color} />,
        }}
      />
      <Tabs.Screen
        name="artists"
        options={{
          title: 'Artists',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: 'Favourites',
          headerShown: false,
          tabBarIcon: ({ color }) => <IconSymbol size={16} name="heart" color={color} />,
        }}
      />
      <Tabs.Screen
        name="playlists"
        options={{
          title: 'Playlists',
          headerShown: false,
          tabBarIcon: ({ color }) => <IconSymbol size={16} name="play.circle" color={color} />,
        }}
      />
    </Tabs>
  );
};

export default Layout;
