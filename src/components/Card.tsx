import { Text, View } from 'react-native';
import PlayingCard from '../common/cards/PlayingCard';
import type { Exercise } from '../common/Exercise';
import type { ExerciseCard as ExerciseCardProps } from '../common/HIITDeck';

const ExerciseView = ({ exercise }: { exercise: Exercise }) => (
  <View>
    <Text>{exercise.name}</Text>
  </View>
);

export default function ExerciseCard({
  rank,
  suit,
  exercise,
}: ExerciseCardProps) {
  const cardColor = ['diamonds', 'hearts'].includes(suit)
    ? 'color-red-500'
    : '';

  return (
    <View
      className={`relative grid aspect-[0.7] w-full place-items-center ${cardColor}`}>
      <View className="absolute left-0 top-0">
        <Text>
          {PlayingCard.abbreviate(rank)}
          {PlayingCard.unicode(suit)}
        </Text>
      </View>
      <View className="absolute right-0 top-0">
        <Text>
          {PlayingCard.abbreviate(rank)}
          {PlayingCard.unicode(suit)}
        </Text>
      </View>
      <View className="absolute bottom-0 right-0">
        <Text>
          {PlayingCard.abbreviate(rank)}
          {PlayingCard.unicode(suit)}
        </Text>
      </View>
      <View className="absolute bottom-0 left-0">
        <Text>
          {PlayingCard.abbreviate(rank)}
          {PlayingCard.unicode(suit)}
        </Text>
      </View>

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
