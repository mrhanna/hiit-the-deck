import { Text } from '@/components/Text';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { reset, selectConfig, selectIsInProgress } from '@/state/workoutSlice';
import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { View } from 'react-native';
import { useConfirm } from '../hooks/useConfirm';
import LaunchScreenButton from './LaunchScreenButton';

const videoSource = require('@assets/bg.mp4');

export default function LaunchScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { confirm } = useConfirm();
  const { difficulty, deck } = useAppSelector(selectConfig);
  const isInProgress = useAppSelector(selectIsInProgress);

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    console.log('play()');
    player.play();
  });

  return (
    <View className="h-full bg-gray-800">
      <View className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-evenly p-4">
        <View className="items-left flex justify-center">
          <Image
            source={require('@assets/images/hiit-w.png')}
            style={{ width: 256, height: 70 }}
            contentFit="contain"
            alt="HIIT"
          />
          <Text className="text-3xl color-white">the Deck</Text>
        </View>
        <View className="flex w-full flex-col justify-center gap-6 p-8">
          <Link href="/game" asChild>
            <LaunchScreenButton className="bg-gray-600">
              <Text className="text-2xl">
                {!isInProgress ? 'Start' : 'Resume'} Workout
              </Text>
            </LaunchScreenButton>
          </Link>
          {isInProgress && (
            <LaunchScreenButton
              onPress={async () => {
                if (
                  await confirm({
                    message:
                      'Your current workout progress will be lost. Start a new workout?',
                    confirmText: 'Yes',
                    dismissText: 'No',
                  })
                ) {
                  dispatch(reset());
                  router.push('/game');
                }
              }}>
              <Text className="text-2xl">New Workout</Text>
            </LaunchScreenButton>
          )}
          <Link href="/decks" asChild>
            <LaunchScreenButton>
              <Text className="text-sm">Deck</Text>
              {'\n'}
              <Text className="text-lg">{deck?.name}</Text>
            </LaunchScreenButton>
          </Link>
          <Link href="/difficulty" asChild>
            <LaunchScreenButton>
              <Text className="text-sm">Difficulty</Text>
              {'\n'}
              <Text className="text-lg">{difficulty.name}</Text>
            </LaunchScreenButton>
          </Link>
        </View>
      </View>

      <View className="absolute left-0 top-0 z-0 h-full w-full">
        <VideoView
          player={player}
          nativeControls={false}
          contentFit="cover"
          style={{
            height: '100%',
          }}
        />
      </View>
    </View>
  );
}
