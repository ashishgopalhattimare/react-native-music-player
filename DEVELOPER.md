### Youtube Tutorial

https://www.youtube.com/watch?v=9CElrkFwiBU

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

### How does useHeaderSearchBar allows to integrate search functionality outside the header and move its implementation to feature level?

- The hook uses useNavigation from Expo Router to access the navigation object externally. The `options` utilized by the top-level component is provided by the hook itself, which are altered at run-time via `setOptions` at the `useHeaderSearchBar` implementation level providing loosely-coupled UI and allowing customizable options for extensibility.

- It sets the search bar options on the navigation header inside a useLayoutEffect. This keeps header configuration logic separated from the component UI logic.

- The onChangeText event handler for the search bar is wrapped in a useCallback to keep it stable and updates internal state (setSearch).

### Create a onChangeDebounce hook which execute the provided callback whenever the search criteria is uses has changed

```
type Props<T> = {
  callback: () => void;
  input: T;
  trackChange: (prevValue: T | null, currValue: T) => boolean;
  delay?: number;
};
const useChangeDebounce = <T>({ callback, trackChange, input, delay = 500 }: Props<T>) => {
  const prevRef = useRef<T>(null);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (trackChange(prevRef.current, input)) {
        callback();
      }
      prevRef.current = input;
    }, delay);
    return () => clearTimeout(timer);
  }, [input, delay]);
};

useChangeDebounce({
  callback: () => refetch?.(),
  input: search,
  trackChange: (prev, curr) => prev !== curr,
});
```
