import { Rank } from './cards/PlayingCard';
import { Exercise, Superset } from './Exercise';

export type RankMap = Record<Rank, Exercise | Superset>;

export interface HIITDeck {
  id: string;
  name: string;
  map: RankMap;
}

export type HIITDeckLibrary = Record<string, HIITDeck>;
