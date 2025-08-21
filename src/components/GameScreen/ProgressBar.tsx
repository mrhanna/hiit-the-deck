import { View } from 'react-native';

export default function ProgressBar({
  value,
  max,
}: {
  value: number;
  max: number;
}) {
  return (
    <View className="h-2 w-full bg-gray-200">
      <View
        className="h-full bg-blue-500"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </View>
  );
}
