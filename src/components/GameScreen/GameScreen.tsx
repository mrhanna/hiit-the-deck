import { useAppDispatch, useAppSelector } from '@/state/hooks';
import {
  nextCard,
  previousCard,
  selectNumberOfCards,
  selectPosition,
} from '@/state/workoutSlice';
import { Button, View } from 'react-native';
import CardStack from './CardStack';
import ProgressBar from './ProgressBar';

export default function GameScreen() {
  const position = useAppSelector(selectPosition);
  const totalCards = useAppSelector(selectNumberOfCards);
  const dispatch = useAppDispatch();

  return (
    <View className="flex h-full justify-between overflow-hidden">
      <ProgressBar value={position} max={totalCards} />

      <CardStack />

      <View className="space-around flex flex-row self-center">
        <Button title="Previous" onPress={() => dispatch(previousCard())} />
        <Button title="Next" onPress={() => dispatch(nextCard())} />
      </View>
    </View>
  );
}
