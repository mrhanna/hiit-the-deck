import { StandardDeck } from '@/common/cards/decks';
import type { Rank, Suit } from '@/common/cards/PlayingCard';
import type { Difficulty } from '@/common/Difficulty';
import { DEFAULT_DIFFICULTIES } from '@/common/Difficulty';
import {
  Exercise,
  isLocalizedQuantity,
  isSuperset,
  Locale,
  Superset,
} from '@/common/Exercise';
import type { HIITDeck } from '@/common/HIITDeck';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import { fetchLibrary } from './librarySlice';
import type { RootState } from './store';

const cards = StandardDeck({ jokers: 2 });

function getShuffledDeck() {
  cards.shuffle();
  return [...cards].map((card) => ({
    rank: card.rank,
    suit: card.suit,
  }));
}

export type PlainPlayingCard = {
  rank: Rank;
  suit: Suit | 'joker';
};

interface WorkoutState {
  position: number;
  cards: PlainPlayingCard[];
  config: {
    deck?: HIITDeck;
    difficulty: Difficulty;
    locale: Locale;
  };
}

const initialState: WorkoutState = {
  position: -1,
  cards: getShuffledDeck(),
  config: {
    deck: undefined,
    difficulty: DEFAULT_DIFFICULTIES.EASY, // todo
    locale: 'us',
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

export const selectConfig = (state: RootState) => state.workout.config;

export const selectBaseForSuit = (suit: Suit) =>
  createSelector(selectConfig, (config) => config.difficulty.config[suit] ?? 1);

export const selectAllCards = createSelector(
  (state: RootState) => state.workout.cards,
  selectConfig,
  (cards, { deck, locale }) => {
    if (!deck) return null;

    return cards.map((card) => {
      const { rank, suit } = card;
      const exerciseCard = {
        rank,
        suit,
        exercise: deck.map[rank],
      };

      const exercise = {
        ...exerciseCard.exercise,
        exercises: isSuperset(exerciseCard.exercise)
          ? exerciseCard.exercise.exercises.map((setExercise) => ({
              ...setExercise,
              quantity: isLocalizedQuantity(setExercise.quantity)
                ? setExercise.quantity[locale]
                : setExercise.quantity,
            }))
          : undefined,
        quantity: isLocalizedQuantity(exerciseCard.exercise.quantity)
          ? exerciseCard.exercise.quantity[locale]
          : exerciseCard.exercise.quantity,
      } as Exercise | Superset;

      return {
        ...exerciseCard,
        exercise,
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
