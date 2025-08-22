import { HIITDeck } from '@/common/HIITDeck';
import { Text } from '@/components/Text';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { selectDecks } from '@/state/librarySlice';
import { deckPicked, selectConfig } from '@/state/workoutSlice';
import { useRouter } from 'expo-router';
import { GestureResponderEvent, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DeckSelectScreen() {
  const currentDeckId = useAppSelector(selectConfig).deck?.id;
  const decks = useAppSelector(selectDecks);
  const router = useRouter();

  return (
    <Pressable
      className="h-full p-6"
      onPress={() => {
        router.dismiss();
      }}
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      }}>
      <SafeAreaView className="flex gap-6">
        {Object.values(decks).map((deck) => (
          <DeckOption
            key={deck.id}
            deck={deck}
            selected={currentDeckId === deck.id}
          />
        ))}
      </SafeAreaView>
    </Pressable>
  );
}

function DeckOption({
  deck,
  selected,
}: {
  deck: HIITDeck;
  selected?: boolean;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <Pressable
      className={`${selected ? ' bg-gray-100' : 'bg-gray-300'} p-4`}
      style={{
        transform: selected ? [{ scale: 1.05 }] : [{ scale: 1 }],
      }}
      onPress={(event: GestureResponderEvent) => {
        event.stopPropagation();
        dispatch(deckPicked(deck));
        router.dismiss();
      }}>
      <Text className="text-lg">{deck.name}</Text>
    </Pressable>
  );
}
