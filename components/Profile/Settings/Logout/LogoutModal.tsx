import React from 'react';
import { View, Text, Modal } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/Button';

interface LogoutConfirmationModalProps {
    isVisible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export function LogoutConfirmationModal({ isVisible, onCancel, onConfirm }: LogoutConfirmationModalProps) {
    const { theme } = useTheme();

    const modalBackground = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
    const modalBorderColor = theme === 'dark' ? 'border-gray-700' : 'border-gray-200';
    const textColor = theme === 'dark' ? 'text-gray-50' : 'text-gray-800';
    const subTextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={onCancel}
        >
            <View className="flex-1 justify-center items-center bg-black/50">
                <View className={`w-11/12 max-w-sm p-6 rounded-2xl border ${modalBackground} ${modalBorderColor}`}>
                    <Text className={`text-center text-xl font-semibold mb-4 ${textColor}`}>
                        Logout
                    </Text>
                    <Text className={`text-center text-base mb-6 ${subTextColor}`}>
                        Are you sure want to log out?
                    </Text>
                    <View className="flex-row justify-around gap-3">
                        <Button
                            title="Cancel"
                            onPress={onCancel}
                            variant="outline"
                            color="danger"
                            fullWidth
                        />
                        <Button
                            title="Yes, Logout"
                            onPress={onConfirm}
                            variant="solid"
                            color="primary"
                            fullWidth
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}
