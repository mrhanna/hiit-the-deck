import '@/global.css';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { fetchLibrary } from '@/state/librarySlice';
import { RootState, store } from '@/state/store';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Provider } from 'react-redux';

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
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="game" />
        <Stack.Screen
          name="difficulty"
          options={{
            presentation: 'modal',
          }}
        />
      </Stack>
    )
  );
}
