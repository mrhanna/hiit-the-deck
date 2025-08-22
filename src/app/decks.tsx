import DeckSelectScreen from '@/components/ConfigScreens/DeckSelectScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DecksRoute() {
  return (
    <SafeAreaView>
      <DeckSelectScreen />
    </SafeAreaView>
  );
}
