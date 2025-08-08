type Locale = 'us' | 'metric';

interface ExerciseQuantity {
  multiplier?: number;
  unit?: string;
  fixed?: string | number;
}

type LocalizedQuantity = Record<Locale, ExerciseQuantity>;

export interface Exercise {
  id: string;
  name: string;
  per?: 'side';
  basis: 'time' | 'reps' | 'distance';

  quantity?: ExerciseQuantity | LocalizedQuantity;
}

export type Superset = {
  exercises: Exercise[];
} & ExerciseQuantity;

export type ExerciseLibrary = Record<string, Exercise>;
