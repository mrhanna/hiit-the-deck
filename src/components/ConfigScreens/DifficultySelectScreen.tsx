import PlayingCard from '@/common/cards/PlayingCard';
import { DEFAULT_DIFFICULTIES, Difficulty } from '@/common/Difficulty';
import { Text } from '@/components/Text';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { difficultyPicked, selectConfig } from '@/state/workoutSlice';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';

export default function DifficultySelectScreen() {
  const currentDifficulty = useAppSelector(selectConfig).difficulty;

  return (
    <View className="flex justify-center gap-6 p-6">
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

  const suits = ['hearts', 'diamonds', 'clubs', 'spades'] as const;

  return (
    <Pressable
      className={`${selected ? ' bg-gray-300' : 'bg-gray-200'} p-4`}
      style={{
        transform: selected ? [{ scale: 1.05 }] : [{ scale: 1 }],
      }}
      onPress={() => {
        dispatch(difficultyPicked(difficulty));
        router.back();
      }}>
      <Text className="text-lg">{difficulty.name}</Text>
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
