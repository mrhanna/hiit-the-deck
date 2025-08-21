import { StandardDeck } from '@/common/cards/decks';
import type PlayingCard from '@/common/cards/PlayingCard';
import type { Difficulty } from '@/common/Difficulty';
import { DEFAULT_DIFFICULTIES } from '@/common/Difficulty';
import type { HIITDeck } from '@/common/HIITDeck';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';
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
    builder.addCase(fetchLibrary.fulfilled, (state, { payload }) => {
      if (!state.config.deck) {
        state.config.deck = Object.values(payload.decks)[0];
      }
    });
  },
});

export const selectAllCards = createSelector(
  (state: RootState) => state.workout.cards,
  (state: RootState) => state.workout.config.deck,
  (cards, deck) => {
    if (!deck) return null;

    return cards.map((card) => {
      const { rank, suit } = card;
      return {
        rank,
        suit,
        exercise: deck.map[rank],
      };
    });
  },
);

export const selectPosition = (state: RootState) => state.workout.position;
export const selectNumberOfCards = (state: RootState) =>
  state.workout.cards.length;

export const selectNumberOfCardsRemaining = createSelector(
  [selectPosition, selectNumberOfCards],
  (position, length) => length - position - 1,
);
export const selectCardAt = (position: number) =>
  createSelector(selectAllCards, (cards) => cards?.[position] ?? null);

export const selectCurrentCard = createSelector(selectPosition, selectCardAt);

export const selectLastNCards = (n: number) =>
  createSelector(selectAllCards, selectPosition, (cards, position) => {
    const arr = Array.from({ length: n }, (_, i) => i);

    return arr.map((i) =>
      cards && position >= 0 ? cards[position - i] : null,
    );
  });

export const {
  deckPicked,
  difficultyPicked,
  nextCard,
  previousCard,
  positionChanged,
  reset,
} = workoutSlice.actions;

export default workoutSlice.reducer;
