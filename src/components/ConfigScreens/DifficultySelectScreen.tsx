import PlayingCard from '@/common/cards/PlayingCard';
import { DEFAULT_DIFFICULTIES, Difficulty } from '@/common/Difficulty';
import { useConfirm } from '@/components/hooks/useConfirm';
import { Text } from '@/components/Text';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import {
  difficultyPicked,
  selectConfig,
  selectIsInProgress,
} from '@/state/workoutSlice';
import { useRouter } from 'expo-router';
import React from 'react';
import { GestureResponderEvent, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CloseButton from './CloseButton';

export default function DifficultySelectScreen() {
  const insets = useSafeAreaInsets();
  const currentDifficulty = useAppSelector(selectConfig).difficulty;
  const router = useRouter();

  return (
    <View
      className="flex h-full justify-end gap-6 p-6"
      style={{
        paddingBottom: insets.bottom + 24,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}>
      <View className="items-center pb-4">
        <CloseButton />
      </View>
      {Object.values(DEFAULT_DIFFICULTIES).map((difficulty) => (
        <DifficultyOption
          key={difficulty.name}
          difficulty={difficulty}
          selected={currentDifficulty.name === difficulty.name}
        />
      ))}
    </View>
  );
}

function DifficultyOption({
  difficulty,
  selected,
}: {
  difficulty: Difficulty;
  selected?: boolean;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isInProgress = useAppSelector(selectIsInProgress);
  const { confirm } = useConfirm();

  const suits = ['hearts', 'diamonds', 'clubs', 'spades'] as const;

  const handlePress = async (event: GestureResponderEvent) => {
    event.stopPropagation();
    if (
      !isInProgress ||
      (await confirm({
        message:
          'Changing the difficulty will reset your current workout. Continue?',
        confirmText: 'Yes',
        dismissText: 'No',
      }))
    ) {
      dispatch(difficultyPicked(difficulty));
    }

    router.dismiss();
  };

  return (
    <Pressable
      className={`${selected ? ' bg-gray-100' : 'bg-gray-300'} p-4`}
      style={{
        transform: selected ? [{ scale: 1.05 }] : [{ scale: 1 }],
      }}
      onPress={handlePress}>
      <Text className="text-2xl">{difficulty.name}</Text>
      <Text className="text-lg">
        {suits.map((suit) => (
          <React.Fragment key={suit}>
            {['hearts', 'diamonds'].includes(suit) ? (
              <Text className="color-red-700">{PlayingCard.unicode(suit)}</Text>
            ) : (
              <>{PlayingCard.unicode(suit)}</>
            )}
            {difficulty.config[suit]}{' '}
          </React.Fragment>
        ))}
      </Text>
    </Pressable>
  );
}
