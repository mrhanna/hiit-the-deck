import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

export default function CloseButton({
  color = 'white',
  size = 36,
  onDismiss,
}: {
  color?: string;
  size?: number;
  onDismiss?: () => void;
}) {
  const router = useRouter();
  const defaultDismiss = () => router.back();

  return (
    <Pressable onPress={onDismiss ?? defaultDismiss}>
      <SimpleLineIcons name="close" size={size} color={color} />
    </Pressable>
  );
}
