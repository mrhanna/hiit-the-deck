import API from '@/api/api';
import type { ExerciseLibrary } from '@/common/Exercise';
import type { HIITDeckLibrary } from '@/common/HIITDeck';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface LibraryState {
  exercises: ExerciseLibrary;
  decks: HIITDeckLibrary;
  status: 'uninitialized' | 'fetching' | 'idle' | 'error';
  error?: string;
}

const initialState: LibraryState = {
  exercises: {},
  decks: {},
  status: 'uninitialized',
  error: undefined,
};

export const fetchLibrary = createAsyncThunk('library/fetch', async () => {
  const exercises = await API.fetchExercises();
  const decks = await API.fetchDecks();

  return { exercises, decks };
});

export const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLibrary.pending, (state) => {
        state.status = 'fetching';
      })
      .addCase(fetchLibrary.fulfilled, (state, action) => {
        state.status = 'idle';
        state.exercises = action.payload.exercises;
        state.decks = action.payload.decks;
      })
      .addCase(fetchLibrary.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

export const selectDecks = (state: RootState) => state.library.decks;

export default librarySlice.reducer;
