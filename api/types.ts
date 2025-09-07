export type Maybe<T> = T | null;

type SongRating = 1 | 2 | 3 | 4 | 5;
export type SongFragment = Readonly<{
  url: string;
  title: string;
  playlist: ReadonlyArray<string>;
  artist: Maybe<string>;
  artwork: Maybe<string>;
  rating: Maybe<SongRating>;
}>;

export type Track = SongFragment;

export type GetSongListResponse = Readonly<{
  data: ReadonlyArray<SongFragment>;
}>;
