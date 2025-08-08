import decks from '../../static/decks';
import exercises from '../../static/exercises';
import { ExerciseLibrary } from '../common/Exercise';
import { HIITDeckLibrary } from '../common/HIITDeck';

export default {
  fetchDecks: async (): Promise<HIITDeckLibrary> => await decks,
  fetchExercises: async (): Promise<ExerciseLibrary> => await exercises,
};
