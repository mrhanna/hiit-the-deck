import PlayingCard from '@/common/cards/PlayingCard';
import { toQuantityString, type Exercise } from '@/common/Exercise';
import type { ExerciseCard } from '@/common/HIITDeck';
import { AnimatedText, Text } from '@/components/Text';
import { useAppSelector } from '@/state/hooks';
import { selectBaseForSuit } from '@/state/workoutSlice';
import { View } from 'react-native';
import { FadeIn } from 'react-native-reanimated';

const ExerciseView = ({
  exercise,
  base,
}: {
  exercise: Exercise;
  base: number;
}) => (
  <View>
    <AnimatedText
      entering={FadeIn.delay(600).duration(300)}
      className="mb-8 text-center text-3xl">
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
        (!('exercises' in exercise) ? (
          <View>
            <ExerciseView exercise={exercise} base={base} />
          </View>
        ) : (
          <View>
            <Text>Superset of</Text>
            {exercise.exercises.map((exercise, i) => (
              <ExerciseView key={i} exercise={exercise} base={base} />
            ))}
          </View>
        ))}
    </BlankCard>
  );
}

export function BlankCard({ children }: { children?: React.ReactNode }) {
  return (
    <View className="relative flex aspect-[0.7] w-full items-center justify-center rounded-xl bg-white shadow-corner">
      {children}
    </View>
  );
}
