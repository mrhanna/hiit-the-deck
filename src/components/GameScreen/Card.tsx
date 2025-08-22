import PlayingCard from '@/common/cards/PlayingCard';
import { isSuperset, toQuantityString, type Exercise } from '@/common/Exercise';
import type { ExerciseCard } from '@/common/HIITDeck';
import { AnimatedText, Text } from '@/components/Text';
import { useAppSelector } from '@/state/hooks';
import { selectBaseForSuit } from '@/state/workoutSlice';
import { View } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

const ExerciseView = ({
  exercise,
  base,
  condense,
}: {
  exercise: Exercise;
  base: number;
  condense?: boolean;
}) => (
  <View>
    <AnimatedText
      entering={FadeIn.delay(600).duration(300)}
      className={`${condense ? 'mb-2 text-2xl' : 'mb-8 text-3xl'} text-center`}>
      {exercise.name}
    </AnimatedText>
    <AnimatedText
      entering={FadeIn.delay(1200).duration(300)}
      className="text-center text-xl">
      {toQuantityString(exercise, base)}
    </AnimatedText>
  </View>
);

type ExerciseCardProps = ExerciseCard & {
  showDescription?: boolean;
};

export default function ExerciseCard({
  rank,
  suit,
  exercise,
  showDescription,
}: ExerciseCardProps) {
  const cardColor = ['diamonds', 'hearts'].includes(suit)
    ? 'color-red-700'
    : '';

  const cornerClasses = [
    'left-4 top-4',
    'right-4 top-4',
    'right-4 bottom-4 rotate-[180deg]',
    'left-4 bottom-4 rotate-[180deg]',
  ];

  const base = useAppSelector(
    selectBaseForSuit(suit === 'joker' ? 'hearts' : suit),
  );

  return (
    <BlankCard>
      {cornerClasses.map((classes) => (
        <View className={`absolute ${classes}`} key={classes}>
          <Text
            className={`text-center text-3xl font-bold leading-[30px] ${cardColor}`}>
            {PlayingCard.abbreviate(rank)}
            {'\n'}
            {PlayingCard.unicode(suit)}
          </Text>
        </View>
      ))}

      {showDescription &&
        (!isSuperset(exercise) ? (
          <View>
            <ExerciseView exercise={exercise} base={base} />
          </View>
        ) : (
          <View>
            <Text>Superset of</Text>
            <Animated.View
              entering={FadeInDown.duration(300)}
              className="mb-8 mt-4 flex justify-center gap-8 border-l-2 pl-4">
              {exercise.exercises.map((exercise, i) => (
                <ExerciseView
                  key={i}
                  exercise={exercise}
                  base={base}
                  condense
                />
              ))}
            </Animated.View>
            <AnimatedText
              entering={FadeIn.delay(1800).duration(300)}
              className="text-3xl">
              {toQuantityString(exercise, base)}
            </AnimatedText>
          </View>
        ))}
    </BlankCard>
  );
}

export function BlankCard({ children }: { children?: React.ReactNode }) {
  return (
    <View className="relative flex aspect-[0.7] w-full items-center justify-center rounded-xl bg-white p-4 shadow-corner">
      {children}
    </View>
  );
}
