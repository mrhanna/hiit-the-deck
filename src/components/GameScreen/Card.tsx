import PlayingCard from '@/common/cards/PlayingCard';
import type { Exercise } from '@/common/Exercise';
import type { ExerciseCard as ExerciseCardProps } from '@/common/HIITDeck';
import { Text, View } from 'react-native';

const ExerciseView = ({ exercise }: { exercise: Exercise }) => (
  <View>
    <Text className="text-3xl">{exercise.name}</Text>
  </View>
);

export default function ExerciseCard({
  rank,
  suit,
  exercise,
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

  return (
    <View
      className={
        'shadow-corner relative flex aspect-[0.7] w-full items-center justify-center rounded-xl bg-white'
      }>
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

      {!('exercises' in exercise) ? (
        <View>
          <ExerciseView exercise={exercise} />
        </View>
      ) : (
        <View>
          <Text>Superset of</Text>
          {exercise.exercises.map((exercise, i) => (
            <ExerciseView key={i} exercise={exercise} />
          ))}
        </View>
      )}
    </View>
  );
}
