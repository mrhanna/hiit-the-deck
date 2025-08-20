import { Pressable, Text } from 'react-native';

export interface LaunchScreenButtonProps {
  onPress?: () => void;
  label: string;
  className?: string;
}

export default function LaunchScreenButton({
  onPress,
  label,
  className,
}: LaunchScreenButtonProps) {
  return (
    <Pressable
      className={`rounded-sm p-4 shadow-sm ${className ?? 'bg-gray-400'}`}
      onPress={onPress}>
      <Text className="text-center text-xl leading-[20px] text-white">
        {label}
      </Text>
    </Pressable>
  );
}
