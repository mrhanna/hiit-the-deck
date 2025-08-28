import { Text } from '@/components/Text';
import { createContext, useContext, useState } from 'react';
import { Button, Modal, Pressable, View } from 'react-native';
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
          animationType="fade"
          visible={isVisible}
          onRequestClose={() => handleClose(false)}>
          <Pressable
            className="flex h-full w-full justify-center"
            onPress={() => handleClose(false)}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            }}>
            <SafeAreaView className="m-6">
              <Pressable onPress={() => {}}>
                <View className="rounded-md bg-white p-8">
                  <Text className="text-lg font-semibold">
                    {modalOptions.message}
                  </Text>
                  <View className="mt-4 justify-end gap-2">
                    <Button
                      title={modalOptions.confirmText || 'OK'}
                      color={'#78350f'}
                      onPress={() => {
                        handleClose(true);
                      }}
                    />
                    <Button
                      title={modalOptions.dismissText || 'Cancel'}
                      color={'#d1d5db'}
                      onPress={() => {
                        handleClose(false);
                      }}
                    />
                  </View>
                </View>
              </Pressable>
            </SafeAreaView>
          </Pressable>
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
