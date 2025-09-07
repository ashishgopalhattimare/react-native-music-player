import { Tabs } from 'expo-router';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol, type IconSymbolName } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useTheme } from '@/hooks/useThemeColor';

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
  const color = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: color.tint,
        tabBarLabelStyle: {
          fontWeight: 500,
          marginBottom: -5, // Move label up by increasing bottom margin negativity
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
          },
        }),
      }}
    >
      {tabList.map((tab) => (
        <Tabs.Screen
          key={tab.title}
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
