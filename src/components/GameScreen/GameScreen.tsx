import { Text } from '@/components/Text';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { selectNumberOfCards, selectPosition } from '@/state/workoutSlice';
import { View } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import CardStack from './CardStack';
import ProgressBar from './ProgressBar';

export default function GameScreen() {
  const insets = useSafeAreaInsets();
  const position = useAppSelector(selectPosition);
  const totalCards = useAppSelector(selectNumberOfCards);
  const dispatch = useAppDispatch();

  return (
    <View
      className="h-full overflow-hidden bg-gray-300"
      style={{ paddingBottom: insets.bottom }}>
      <ProgressBar value={position} max={totalCards} />
      <View className="h-full">
        <View className="absolute left-0 top-0 z-0 flex h-full w-full items-center justify-center">
          <Text className="text-center text-3xl font-bold text-gray-400">
            Swipe left to{'\n'}draw a card
          </Text>
        </View>
        <SafeAreaView className="z-1 absolute left-0 top-0 flex h-full w-full items-center justify-center">
          <CardStack />
        </SafeAreaView>
      </View>
    </View>
  );
}
