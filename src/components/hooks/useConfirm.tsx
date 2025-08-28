import { Text } from '@/components/Text';
import { createContext, useContext, useState } from 'react';
import { Button, Modal, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export interface ConfirmOptions {
  message?: string;
  confirmText?: string;
  dismissText?: string;
}

export interface ConfirmContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [modalOptions, setModalOptions] = useState<ConfirmOptions>({});
  const [isVisible, setVisible] = useState<boolean>(false);
  const [resolver, setResolver] = useState<((value: boolean) => void) | null>(
    null,
  );

  const confirm = (options: ConfirmOptions) => {
    setModalOptions(options);
    setVisible(true);
    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve);
    });
  };

  const handleClose = (result: boolean) => {
    setVisible(false);
    setModalOptions({});
    resolver?.(result);
    setResolver(null);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {modalOptions && (
        <Modal
          transparent
          animationType="slide"
          visible={isVisible}
          onRequestClose={() => handleClose(false)}>
          <View
            className="h-full w-full"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            }}>
            <SafeAreaView className="flex justify-center p-4">
              <View className="rounded-md bg-white p-4">
                <Text className="text-lg font-semibold">
                  {modalOptions.message}
                </Text>
                <View className="mt-4 flex-row justify-end">
                  <Button
                    title={modalOptions.dismissText || 'Cancel'}
                    onPress={() => handleClose(false)}
                  />
                  <Button
                    title={modalOptions.confirmText || 'OK'}
                    onPress={() => handleClose(true)}
                  />
                </View>
              </View>
            </SafeAreaView>
          </View>
        </Modal>
      )}
    </ConfirmContext.Provider>
  );
}

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }
  return context;
};
