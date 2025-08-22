import type { Rank, Suit } from './cards/PlayingCard';
import type {
  CatalogExercise,
  CatalogSuperset,
  Exercise,
  Superset,
} from './Exercise';

export type RankMap = Record<Rank, CatalogExercise | CatalogSuperset>;

export interface HIITDeck {
  id: string;
  name: string;
  map: RankMap;
}

export interface ExerciseCard {
  exercise: Exercise | Superset;
  rank: Rank;
  suit: Suit | 'joker';
}

export type HIITDeckLibrary = Record<string, HIITDeck>;
