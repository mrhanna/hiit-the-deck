import { HIITDeck } from '@/common/HIITDeck';
import { useConfirm } from '@/components/hooks/useConfirm';
import { Text } from '@/components/Text';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { selectDecks } from '@/state/librarySlice';
import {
  deckPicked,
  selectConfig,
  selectIsInProgress,
} from '@/state/workoutSlice';
import { useRouter } from 'expo-router';
import {
  GestureResponderEvent,
  Pressable,
  ScrollView,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CloseButton from './CloseButton';

export default function DeckSelectScreen() {
  const currentDeckId = useAppSelector(selectConfig).deck?.id;
  const decks = useAppSelector(selectDecks);
  const router = useRouter();

  return (
    <View
      className="flex-1 px-2 py-6"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
      }}>
      <SafeAreaView className="flex-1 gap-6">
        <ScrollView
          className="flex-1"
          contentContainerClassName="flex-grow flex gap-6 px-4">
          {Object.values(decks).map((deck) => (
            <DeckOption
              key={deck.id}
              deck={deck}
              selected={currentDeckId === deck.id}
            />
          ))}
        </ScrollView>
        <View className="flex items-center">
          <CloseButton />
        </View>
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
  const isInProgress = useAppSelector(selectIsInProgress);
  const { confirm } = useConfirm();

  const handlePress = async (event: GestureResponderEvent) => {
    event.stopPropagation();
    if (
      !isInProgress ||
      (await confirm({
        message: 'Changing the deck will reset your current workout. Continue?',
        confirmText: 'Yes',
        dismissText: 'No',
      }))
    ) {
      dispatch(deckPicked(deck));
    }

    router.back();
  };

  return (
    <Pressable
      className={`${selected ? ' bg-gray-100' : 'bg-gray-300'} p-4`}
      style={{
        transform: selected ? [{ scale: 1.05 }] : [{ scale: 1 }],
      }}
      onPress={handlePress}>
      <Text className="text-lg">{deck.name}</Text>
    </Pressable>
  );
}
