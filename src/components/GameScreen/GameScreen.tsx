import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { selectNumberOfCards, selectPosition } from '@/state/workoutSlice';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CardStack from './CardStack';
import ProgressBar from './ProgressBar';

export default function GameScreen() {
  const insets = useSafeAreaInsets();
  const position = useAppSelector(selectPosition);
  const totalCards = useAppSelector(selectNumberOfCards);
  const dispatch = useAppDispatch();

  return (
    <View
      className="flex h-full justify-center overflow-hidden bg-gray-600"
      style={{ paddingBottom: insets.bottom }}>
      <ProgressBar value={position} max={totalCards} />

      <CardStack />
    </View>
  );
}
