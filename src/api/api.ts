import type { ExerciseLibrary } from '@/common/Exercise';
import type { HIITDeckLibrary } from '@/common/HIITDeck';
import decks from '@assets/decks';
import exercises from '@assets/exercises';

export default {
  fetchDecks: async (): Promise<HIITDeckLibrary> => await decks,
  fetchExercises: async (): Promise<ExerciseLibrary> => await exercises,
};
