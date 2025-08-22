import { HIITDeck } from '@/common/HIITDeck';
import { Text } from '@/components/Text';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { selectDecks } from '@/state/librarySlice';
import { deckPicked, selectConfig } from '@/state/workoutSlice';
import { useRouter } from 'expo-router';
import { Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DeckSelectScreen() {
  const currentDeckId = useAppSelector(selectConfig).deck?.id;
  const decks = useAppSelector(selectDecks);

  return (
    <View
      className="h-full justify-center  p-6"
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
    </View>
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
      onPress={() => {
        dispatch(deckPicked(deck));
        router.back();
      }}>
      <Text className="text-lg">{deck.name}</Text>
    </Pressable>
  );
}
