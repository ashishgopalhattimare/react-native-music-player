import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol, type IconSymbolName } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

type TabData = {
  name: string;
  title: string;
  iconName: IconSymbolName;
};
const tabList: ReadonlyArray<TabData> = [
  {
    name: '(songs)',
    title: 'Songs',
    iconName: 'music.mic',
  },
  {
    name: 'artists',
    title: 'Artists',
    iconName: 'person.crop.circle',
  },
  {
    name: 'favourites',
    title: 'Favourites',
    iconName: 'heart',
  },
  {
    name: 'playlists',
    title: 'Playlists',
    iconName: 'play.circle',
  },
];

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
            marginBottom: 8,
          },
        }),
      }}
    >
      {tabList.map((tab) => (
        <Tabs.Screen
          name={tab.name}
          options={{
            title: tab.title,
            headerShown: false,
            tabBarIcon: ({ color }) => <IconSymbol size={16} name={tab.iconName} color={color} />,
          }}
        />
      ))}
    </Tabs>
  );
};

export default Layout;
