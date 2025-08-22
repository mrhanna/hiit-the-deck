import { useAppDispatch } from '@/state/hooks';
import { nextCard, previousCard } from '@/state/workoutSlice';
import { useRef } from 'react';
import { PanResponder } from 'react-native';

export function useStackSwipeHandlers() {
  const dispatch = useAppDispatch();
  // PanResponder for swipe gestures over the card area
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to horizontal swipes with a minimum distance
        return Math.abs(gestureState.dx) > 20 && Math.abs(gestureState.dy) < 30;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -40) {
          // Swipe left
          dispatch(nextCard());
        } else if (gestureState.dx > 40) {
          // Swipe right
          dispatch(previousCard());
        }
      },
    }),
  ).current;

  return panResponder.panHandlers;
}
