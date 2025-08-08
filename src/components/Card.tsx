import { Text, View } from 'react-native';
import PlayingCard from '../common/cards/PlayingCard';
import { Exercise } from '../common/Exercise';
import { ExerciseCard as ExerciseCardProps } from '../common/HIITDeck';

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
      className={`aspect-[0.7] grid place-items-center relative w-full ${cardColor}`}>
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
      <View className="absolute right-0 bottom-0">
        <Text>
          {PlayingCard.abbreviate(rank)}
          {PlayingCard.unicode(suit)}
        </Text>
      </View>
      <View className="absolute left-0 bottom-0">
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
