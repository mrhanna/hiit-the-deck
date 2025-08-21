import { useAppSelector } from '@/state/hooks';
import { selectPosition } from '@/state/workoutSlice';
import { useEffect, useRef } from 'react';

export default function useLastPosition() {
  const currentPosition = useAppSelector(selectPosition);
  const lastPosition = useRef<number>(currentPosition);

  useEffect(() => {
    lastPosition.current = currentPosition;
  }, [currentPosition]);

  return lastPosition.current;
}
