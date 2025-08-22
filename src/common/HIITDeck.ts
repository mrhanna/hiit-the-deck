import type { Rank, Suit } from './cards/PlayingCard';
import type { CatalogExercise, Exercise, Superset } from './Exercise';

export type RankMap = Record<Rank, CatalogExercise | Superset>;

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
