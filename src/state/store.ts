import { configureStore } from '@reduxjs/toolkit';
import LibrarySlice from './librarySlice';
import WorkoutSlice from './workoutSlice';

export const store = configureStore({
  reducer: {
    library: LibrarySlice,
    workout: WorkoutSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
