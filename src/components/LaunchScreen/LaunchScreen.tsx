import { Image } from 'expo-image';
import { Text, View } from 'react-native';
import LaunchScreenButton from './LaunchScreenButton';

export default function LaunchScreen() {
  return (
    <View className="flex h-full items-center gap-8">
      <View className="flex flex-1 items-center justify-center">
        <Image
          source={require('@/assets/images/hiit.png')}
          className="block h-24 w-64"
          contentFit="contain"
          alt="HIIT"
        />
        <Text className="text-3xl">the Deck</Text>
      </View>
      <View className="flex w-full flex-1 flex-col justify-center gap-2 p-2">
        <LaunchScreenButton
          className="bg-gray-700"
          label="Start"
          onPress={() => {}}
        />
        <LaunchScreenButton label="Deck" onPress={() => {}} />
        <LaunchScreenButton label="Difficulty" onPress={() => {}} />
      </View>
    </View>
  );
}
