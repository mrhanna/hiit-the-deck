import { useAppDispatch, useAppSelector } from '@/state/hooks';
import {
  nextCard,
  previousCard,
  selectLastNCards,
  selectNumberOfCards,
  selectPosition,
} from '@/state/workoutSlice';
import { useRef } from 'react';
import { Button, PanResponder, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import Card, { BlankCard } from './Card';
import { slideIn, slideOut } from './GameScreenAnimations';
import ProgressBar from './ProgressBar';

export default function GameScreen() {
  const lastThreeCards = useAppSelector(selectLastNCards(3));
  const position = useAppSelector(selectPosition);
  const totalCards = useAppSelector(selectNumberOfCards);
  const dispatch = useAppDispatch();

  // PanResponder for swipe gestures over the card area
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Only respond to horizontal swipes with a minimum distance
        return Math.abs(gestureState.dx) > 20 && Math.abs(gestureState.dy) < 30;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -40) {
          // Swipe left
          dispatch(nextCard());
        } else if (gestureState.dx > 40) {
          // Swipe right
          dispatch(previousCard());
        }
      },
    }),
  ).current;

  return (
    <View className="flex h-full justify-between">
      <ProgressBar value={position} max={totalCards} />

      <View className="m-4" {...panResponder.panHandlers}>
        <View style={{ opacity: 0, position: 'relative' }}>
          <BlankCard />
        </View>
        {lastThreeCards.map((card, index) => {
          return (
            card && (
              <Animated.View
                className="absolute left-0 top-0 h-full w-full"
                entering={index === 0 ? slideIn : FadeIn}
                exiting={index === 0 ? slideOut : undefined}
                style={{
                  // transformOrigin: 'bottom left',
                  // transitionProperty: ['transform'],
                  // transitionDuration: '200ms',
                  zIndex: 5 - index,
                  opacity: Math.min(1 / (index + 1) + 1, 1),
                  transform: [
                    {
                      translateX: index * 6,
                    },
                    {
                      translateY: index * 6,
                    },
                  ],
                }}
                key={`${card.rank}-${card.suit}-${position - index}`}>
                <Card {...card} />
              </Animated.View>
            )
          );
        })}
      </View>
      <View className="space-around flex flex-row self-center">
        <Button title="Previous" onPress={() => dispatch(previousCard())} />
        <Button title="Next" onPress={() => dispatch(nextCard())} />
      </View>
    </View>
  );
}
