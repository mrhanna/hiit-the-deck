const locales = ['us', 'metric'] as const;

export type Locale = (typeof locales)[number];

interface ExerciseQuantity {
  multiplier?: number;
  unit?: string;
  fixed?: string | number;
}

export function toQuantityString(exercise: Exercise | Superset, base: number) {
  const ex = exercise as Exercise;
  const { quantity } = ex;
  const value = `${quantity?.fixed ?? base * (quantity?.multiplier ?? 1)}`;
  const unit = ex.basis === 'reps' ? 'reps' : (quantity?.unit ?? '');
  const per = ex.per ? `per ${ex.per}` : '';

  return [value, unit, per].filter(Boolean).join(' ');
}

type LocalizedQuantity = Record<Locale, ExerciseQuantity>;

export const isLocalizedQuantity = (
  quantity?: ExerciseQuantity | LocalizedQuantity,
): quantity is LocalizedQuantity => {
  return (quantity as LocalizedQuantity)?.[locales[0]] !== undefined;
};

interface UnquantifiedExercise {
  id: string;
  name: string;
  per?: 'side';
  basis: 'time' | 'reps' | 'distance';
}

export type CatalogExercise = UnquantifiedExercise & {
  quantity?: ExerciseQuantity | LocalizedQuantity;
};

export type Exercise = UnquantifiedExercise & {
  quantity?: ExerciseQuantity;
};

export type CatalogSuperset = {
  exercises: CatalogExercise[];
  quantity?: ExerciseQuantity;
};

export type Superset = {
  exercises: Exercise[];
  quantity?: ExerciseQuantity;
};

export const isSuperset = (
  exercise?: CatalogExercise | CatalogSuperset,
): exercise is CatalogSuperset => {
  return (exercise as CatalogSuperset)?.exercises !== undefined;
};

export type ExerciseLibrary = Record<string, CatalogExercise>;
