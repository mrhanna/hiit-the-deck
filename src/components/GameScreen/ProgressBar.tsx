import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export default function ProgressBar({
  value,
  max,
}: {
  value: number;
  max: number;
}) {
  const sharedValue = useSharedValue(value);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${(Math.max(0, sharedValue.value) / max) * 100}%`,
  }));

  useEffect(() => {
    sharedValue.value = withTiming(value, {
      duration: 400,
      easing: Easing.inOut(Easing.exp),
    });
  }, [value]);

  return (
    <View className="absolute left-0 top-0 h-2 w-full bg-gray-700">
      <Animated.View className="h-full bg-amber-900" style={animatedStyle} />
    </View>
  );
}
