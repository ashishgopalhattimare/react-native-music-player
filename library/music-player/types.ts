import { Track } from "@/api/types";

export type MediaPlayerContextProps = {
  play: (track: Track) => void;
  pause: () => void;
  resume: () => void;
  track: Track | null;
  isPaused: boolean;
};
