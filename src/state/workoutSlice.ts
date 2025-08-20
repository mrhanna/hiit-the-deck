import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { StandardDeck } from '../common/cards/decks';
import type PlayingCard from '../common/cards/PlayingCard';
import type { Difficulty } from '../common/Difficulty';
import { DEFAULT_DIFFICULTIES } from '../common/Difficulty';
import type { ExerciseCard, HIITDeck } from '../common/HIITDeck';
import { fetchLibrary } from './librarySlice';
import type { RootState } from './store';

const cards = StandardDeck({ jokers: 2 });

function getShuffledDeck() {
  cards.shuffle();
  return [...cards];
}

interface WorkoutState {
  position: number;
  cards: PlayingCard[];
  config: {
    deck?: HIITDeck;
    difficulty: Difficulty;
  };
}

const initialState: WorkoutState = {
  position: -1,
  cards: getShuffledDeck(),
  config: {
    deck: undefined,
    difficulty: DEFAULT_DIFFICULTIES.EASY, // todo
  },
};

export const workoutSlice = createSlice({
  name: 'workout',
  initialState,
  reducers: {
    deckPicked: (state, action: PayloadAction<HIITDeck>) => {
      state.config.deck = action.payload;
    },

    difficultyPicked: (state, action: PayloadAction<Difficulty>) => {
      state.config.difficulty = action.payload;
    },

    nextCard: (state) => {
      if (state.position < state.cards.length) {
        state.position += 1;
      }
    },

    previousCard: (state) => {
      if (state.position >= 0) {
        state.position -= 1;
      }
    },

    positionChanged: (state, action: PayloadAction<number>) => {
      state.position = action.payload;
    },

    reset: (state) => {
      state.position = -1;
      state.cards = getShuffledDeck();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLibrary.fulfilled, (state, action) => {
      if (!state.config.deck) {
        state.config.deck = action.payload.decks[0];
      }
    });
  },
});

export const selectPosition = (state: RootState) => state.workout.position;
export const selectNumberOfCardsRemaining = (state: RootState) =>
  state.workout.cards.length - state.workout.position - 1;

export const selectCardAt =
  (position: number) =>
  (state: RootState): ExerciseCard | null => {
    if (!state.workout.config.deck) throw Error('deck is undefined'); // should never happen

    const card = state.workout.cards[position];

    if (!card) return null;

    const { rank, suit } = card;

    return {
      rank,
      suit,
      exercise: state.workout.config.deck.map[rank],
    };
  };

export const selectAllCards = (state: RootState) => {
  const allCards = [];

  for (let i = 0; i < state.workout.cards.length; i++) {
    allCards.push(selectCardAt(i)(state));
  }

  return allCards;
};

export const selectCurrentCard = (state: RootState) =>
  selectCardAt(state.workout.position)(state);

export const {
  deckPicked,
  difficultyPicked,
  nextCard,
  previousCard,
  positionChanged,
  reset,
} = workoutSlice.actions;

export default workoutSlice.reducer;
