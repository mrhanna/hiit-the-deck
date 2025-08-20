import '@/global.css';
import { store } from '@/state/store';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack />
    </Provider>
  );
}
