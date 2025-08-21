import { useAppDispatch, useAppSelector } from '@/state/hooks';
import {
  nextCard,
  previousCard,
  selectCurrentCard,
} from '@/state/workoutSlice';
import { Button, View } from 'react-native';
import Card from './Card';

export default function GameScreen() {
  const currentCard = useAppSelector(selectCurrentCard);
  const dispatch = useAppDispatch();

  return (
    <View className="flex h-full items-center justify-center p-4">
      {currentCard && <Card {...currentCard} />}
      <View className="space-around flex flex-row">
        <Button title="Previous" onPress={() => dispatch(previousCard())} />
        <Button title="Next" onPress={() => dispatch(nextCard())} />
      </View>
    </View>
  );
}
