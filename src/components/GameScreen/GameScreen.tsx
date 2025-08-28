import { Text } from '@/components/Text';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import {
  nextCard,
  previousCard,
  selectNumberOfCards,
  selectPosition,
} from '@/state/workoutSlice';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Link, useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useSwipeHandlers } from '../hooks/useSwipeHandlers';
import CardStack from './CardStack';
import ProgressBar from './ProgressBar';

export default function GameScreen() {
  const insets = useSafeAreaInsets();
  const position = useAppSelector(selectPosition);
  const totalCards = useAppSelector(selectNumberOfCards);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const swipeHandlers = useSwipeHandlers({
    left: () => {
      dispatch(nextCard());
    },
    right: () => {
      dispatch(previousCard());
    },
    up: () => {
      router.push('/game/showMove');
    },
  });

  return (
    <View className="h-full overflow-hidden bg-gray-300" {...swipeHandlers}>
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
          <View className="flex h-16 flex-row items-center justify-between px-4">
            <Pressable
              onPress={() => router.back()}
              className="rounded-full bg-gray-100 p-2 shadow">
              <Icon name="home" color="black" size={24} />
            </Pressable>
            {position > -1 && (
              <Animated.View
                entering={FadeInDown.delay(2000).duration(300)}
                exiting={FadeOutDown.duration(300)}
                className="relative">
                <Link
                  href="/game/showMove"
                  className="rounded-t-sm bg-gray-100 px-8 py-4 shadow">
                  <Text className=" text-lg color-black">Show Me The Move</Text>
                </Link>
                <View className="z-1 absolute left-1/2 top-0 -ml-4 -mt-2 flex h-8 w-8 items-center rounded-full  bg-gray-100">
                  <Icon name="chevron-double-up" color="#ccc" size={16} />
                </View>
              </Animated.View>
            )}
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
}
