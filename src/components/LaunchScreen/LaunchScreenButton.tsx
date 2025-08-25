import { Text } from '@/components/Text';
import { ReactNode } from 'react';
import { Pressable } from 'react-native';

export interface LaunchScreenButtonProps {
  onPress?: () => void;
  children: ReactNode;
  className?: string;
}

export default function LaunchScreenButton({
  onPress,
  children,
  className,
}: LaunchScreenButtonProps) {
  return (
    <Pressable
      className={`rounded-sm py-4 pl-4 opacity-80 shadow-sm ${className ?? 'bg-gray-900'}`}
      onPress={onPress}>
      <Text className="text-left text-2xl leading-[20px] text-white">
        {children}
      </Text>
    </Pressable>
  );
}
