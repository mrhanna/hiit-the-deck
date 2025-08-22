import { Text } from '@/components/Text';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { selectNumberOfCards, selectPosition } from '@/state/workoutSlice';
import { Link } from 'expo-router';
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
    <View className="h-full overflow-hidden bg-gray-300">
      <ProgressBar value={position} max={totalCards} />
      <View className="h-full">
        <View className="absolute left-0 top-0 z-0 flex h-full w-full items-center justify-center">
          <Text className="text-center text-3xl font-bold text-gray-400">
            Swipe left to{'\n'}draw a card
          </Text>
        </View>
        <SafeAreaView className="z-1 absolute left-0 top-0 flex h-full w-full justify-between">
          <View></View>
          <View>
            <CardStack />
          </View>
          <View className="self-center">
            <Link href="/game/showMove" className="bg-gray-500 px-8 py-4">
              <Text className="color-gray-300">Show Me The Move</Text>
            </Link>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}
