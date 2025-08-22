import { Text } from '@/components/Text';
import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { useSwipeHandlers } from '../hooks/useSwipeHandlers';

export default function showMoveScreen() {
  const router = useRouter();
  const handlers = useSwipeHandlers({
    down: () => {
      router.back();
    },
  });
  return (
    <View
      className="flex h-full items-center justify-center bg-gray-900"
      {...handlers}>
      <Text className="text-white">
        This is where Jim will show you the move
      </Text>
    </View>
  );
}
