import { ExerciseCard } from '@/common/HIITDeck';
import useLastPosition from '@/components/hooks/useLastPosition';
import { useSwipeHandlers } from '@/components/hooks/useSwipeHandlers';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import {
  nextCard,
  previousCard,
  selectCardAt,
  selectLastNCards,
  selectPosition,
} from '@/state/workoutSlice';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Card, { BlankCard } from './Card';

export default function CardStack() {
  const [currentCard, ...otherCards] = useAppSelector(selectLastNCards(3));
  const position = useAppSelector(selectPosition);
  const lastPosition = useLastPosition();
  const lastCard = useAppSelector(selectCardAt(lastPosition));
  const dispatch = useAppDispatch();

  const swipeHandlers = useSwipeHandlers({
    left: () => dispatch(nextCard()),
    right: () => dispatch(previousCard()),
  });

  return (
    <View className="m-8" {...swipeHandlers}>
      {/* invisible card for spacing */}
      <View style={{ opacity: 0, position: 'relative' }}>
        <BlankCard />
      </View>

      {/* The main card*/}
      {currentCard && (
        <AnimatedStackCard
          key={`${currentCard.rank}-${currentCard.suit}-${position}`}
          card={currentCard}
          stackIndex={0}
          enter={position > lastPosition}
          showDescription
        />
      )}

      {/* The unmounted card */}
      {lastCard && lastPosition > position && (
        <AnimatedStackCard
          key={`${lastCard.rank}-${lastCard.suit}-${lastPosition}`}
          card={lastCard}
          stackIndex={-1}
          exit
        />
      )}

      {/* The stacked cards */}
      {otherCards.map((card, index) => {
        return (
          card && (
            <AnimatedStackCard
              key={`${card.rank}-${card.suit}-${position - index - 1}`}
              card={card}
              stackIndex={index + 1}
            />
          )
        );
      })}
    </View>
  );
}

const OFFSET = 600;
const ROTATION = '75deg';

function AnimatedStackCard({
  card,
  stackIndex,
  enter,
  exit,
  showDescription = false,
}: {
  card: ExerciseCard;
  stackIndex: number;
  enter?: boolean;
  exit?: boolean;
  showDescription?: boolean;
}) {
  const translateX = useSharedValue<number>(enter ? OFFSET : 0);
  const translateY = useSharedValue<number>(0);
  const rotate = useSharedValue<string>('0deg');

  const animatedStyle = {
    transform: [
      { translateX: translateX },
      { translateY: translateY },
      { rotate: rotate },
    ],
  };

  useEffect(() => {
    if (enter) {
      translateX.value = OFFSET;
      rotate.value = ROTATION;

      translateX.value = withTiming(0, {
        duration: 500,
        easing: Easing.out(Easing.poly(6)),
      });

      rotate.value = withTiming('0deg', {
        duration: 500,
        easing: Easing.out(Easing.poly(6)),
      });
    } else if (exit) {
      translateX.value = withTiming(OFFSET, {
        duration: 500,
        easing: Easing.in(Easing.cubic),
      });

      rotate.value = withTiming(ROTATION, {
        duration: 500,
        easing: Easing.in(Easing.cubic),
      });
    } else {
      const options = {
        duration: 100,
      };
      translateX.value = withTiming(stackIndex * 6, options);
      translateY.value = withTiming(stackIndex * 6, options);
    }
  }, [stackIndex, enter, exit]);

  return (
    <Animated.View
      className="absolute left-0 top-0 h-full w-full"
      style={{
        zIndex: 5 - stackIndex,
        opacity: Math.min(1 / (stackIndex + 1) + 1, 1),
        ...animatedStyle,
      }}>
      <Card showDescription={showDescription && !exit} {...card} />
    </Animated.View>
  );
}
