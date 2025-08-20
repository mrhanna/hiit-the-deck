const locales = ['us', 'metric'] as const;

type Locale = (typeof locales)[number];

interface ExerciseQuantity {
  multiplier?: number;
  unit?: string;
  fixed?: string | number;
}

type LocalizedQuantity = Record<Locale, ExerciseQuantity>;

export const isLocalizedQuantity = (
  quantity: ExerciseQuantity | LocalizedQuantity,
): quantity is LocalizedQuantity => {
  return (quantity as LocalizedQuantity)[locales[0]] !== undefined;
};

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
