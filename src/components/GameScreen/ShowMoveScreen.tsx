import { Text } from '@/components/Text';
import { View } from 'react-native';

export default function showMoveScreen() {
  return (
    <View className="flex items-center justify-center bg-gray-900">
      <Text className="text-white">
        This is where Jim will show you the move
      </Text>
    </View>
  );
}
