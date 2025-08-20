import decks from '../../static/decks';
import exercises from '../../static/exercises';
import type { ExerciseLibrary } from '../common/Exercise';
import type { HIITDeckLibrary } from '../common/HIITDeck';

export default {
  fetchDecks: async (): Promise<HIITDeckLibrary> => await decks,
  fetchExercises: async (): Promise<ExerciseLibrary> => await exercises,
};
