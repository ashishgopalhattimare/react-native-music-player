import { fetchSongs } from '@/api/graphql';
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from '@/components/react-native';
import { useChangeDebounce } from '@/hooks/useChangeDebounce';
import { useHeaderSearch } from '@/hooks/useHeaderSearchBar';
import { useQuery } from '@/hooks/useQuery';
import { GetSongListResponse } from '@/types';

import { SongListView } from './ui/song-list-view';

const fetch = (args?: Record<string, unknown>) => fetchSongs(args);

const Separator = () => <View style={styles.separator} />;

const defaultSearchOptions = {
  placeholder: 'Find in songs',
};
export const SongsList = () => {
  const search = useHeaderSearch(defaultSearchOptions);
  const { data, error, loading, refetch } = useQuery<GetSongListResponse>(fetch, {
    input: {
      search: search,
    },
  });

  useChangeDebounce({
    callback: () => refetch?.(),
    input: search,
    trackChange: (prev, curr) => prev !== curr,
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (!data) return null;

  const songList = data.data;
  return (
    <FlatList
      data={songList}
      keyExtractor={(item) => item.title}
      contentContainerStyle={{
        paddingTop: 10,
        paddingBottom: 10,
      }}
      ItemSeparatorComponent={Separator}
      ListFooterComponent={Separator}
      renderItem={({ item: metadata }) => (
        <TouchableHighlight>
          <SongListView data={metadata} />
        </TouchableHighlight>
      )}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    marginVertical: 6,
    marginLeft: 50 + 8,
    backgroundColor: '#2d2d2d',
    opacity: 0.5,
  },
});
