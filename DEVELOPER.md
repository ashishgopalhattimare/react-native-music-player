# Learning Notes

---

### What is the difference between \_layout.tsx and index.ts in a path directory

With reference to Expo Router, `_layout.tsx` defines the structure of the route or common UI for all the internal sub-routes, whereas `index.tsx` is the default sub-route for this route.

```
(songs)/
 |- _layout.tsx
 |- index.tsx       <!-- /songs -->
 |- description.tsx <!-- /songs/description -->
```

When navigating to the route corresponding to the directory, Expo Router first renders the \_layout.tsx (which usually returns a navigator like <Stack />), then renders the index.tsx page inside that layout.

### Can I have layout.tsx define header and footer UI and index.ts contain the main UI

```
// _layout.tsx
export default function Layout({ children }) {
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text>Header UI here</Text>
      </View>
      <View style={{ flex: 1 }}>
        {children}  {/* renders index.tsx or other page content here */}
      </View>
      <View>
        <Text>Footer UI here</Text>
      </View>
    </View>
  );
}
```

```
// index.tsx
import { View, Text } from 'react-native';

export default function Home() {
  return (
    <View>
      <Text>Main UI content of index.tsx</Text>
    </View>
  );
}
```
