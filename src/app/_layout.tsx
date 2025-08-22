import '@/global.css';
import { JsStack as Stack } from '@/layout/JSStack';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { fetchLibrary } from '@/state/librarySlice';
import { RootState, store } from '@/state/store';
import { useFonts } from 'expo-font';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

SystemUI.setBackgroundColorAsync('#1f2937');

export default function RootLayout() {
  return (
    <Provider store={store}>
      <LayoutContent />
    </Provider>
  );
}

export const unstable_settings = {
  initialRouteName: 'index',
};

function LayoutContent() {
  const dispatch = useAppDispatch();
  const ready =
    useAppSelector((state: RootState) => state.library.status) === 'idle';

  const [loaded] = useFonts({
    'archivo-regular': require('@assets/fonts/Archivo-Regular.ttf'),
  });

  useEffect(() => {
    dispatch(fetchLibrary());
  }, [dispatch]);

  return (
    ready &&
    loaded && (
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#374151',
          },
          headerTintColor: '#ffffff',
        }}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="game/index"
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="difficulty"
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
            presentation: 'transparentModal',
          }}
        />
        <Stack.Screen
          name="decks"
          options={{
            presentation: 'transparentModal',
            animation: 'fade_from_bottom',
            headerShown: false,
          }}
        />
      </Stack>
    )
  );
}
