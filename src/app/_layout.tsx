import '@/global.css';
import { useAppDispatch } from '@/state/hooks';
import { fetchLibrary } from '@/state/librarySlice';
import { store } from '@/state/store';
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

function LayoutContent() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLibrary());
  }, [dispatch]);

  return <Stack />;
}
