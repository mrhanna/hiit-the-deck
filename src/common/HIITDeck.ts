import { Rank, Suit } from './cards/PlayingCard';
import { Exercise, Superset } from './Exercise';

export type RankMap = Record<Rank, Exercise | Superset>;

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
