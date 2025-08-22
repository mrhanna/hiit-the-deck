import { useAppDispatch } from '@/state/hooks';
import { useRef } from 'react';
import { PanResponder } from 'react-native';

export function useSwipeHandlers({
  left,
  right,
  up,
  down,
}: {
  left?: () => void;
  right?: () => void;
  up?: () => void;
  down?: () => void;
}) {
  const dispatch = useAppDispatch();
  // PanResponder for swipe gestures over the card area
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to biased swipes
        return (
          (Math.abs(gestureState.dx) > 20 && Math.abs(gestureState.dy) < 30) ||
          (Math.abs(gestureState.dy) > 20 && Math.abs(gestureState.dx) < 30)
        );
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -40) {
          // Swipe left
          left && left();
        } else if (gestureState.dx > 40) {
          // Swipe right
          right && right();
        } else if (gestureState.dy < -40) {
          // Swipe up
          up && up();
        } else if (gestureState.dy > 40) {
          // Swipe down
          down && down();
        }
      },
    }),
  ).current;

  return panResponder.panHandlers;
}
