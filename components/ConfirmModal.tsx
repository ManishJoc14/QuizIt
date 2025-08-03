import React from 'react';
import { View, Text, Modal } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/Button';

interface ConfirmationModalProps {
    isVisible: boolean;
    title?: string;
    message: string;
    onCancel: () => void;
    onConfirm: () => void;
    confirmText?: string;
    cancelText?: string;
}

export function ConfirmationModal({
    isVisible,
    title = "Are you sure?",
    message,
    onCancel,
    onConfirm,
    confirmText = "Confirm",
    cancelText = "Cancel",
}: ConfirmationModalProps) {
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
                        {title}
                    </Text>
                    <Text className={`text-center text-base mb-6 ${subTextColor}`}>
                        {message}
                    </Text>
                    <View className="flex-row justify-around gap-3">
                        <Button
                            title={cancelText}
                            onPress={onCancel}
                            variant="outline"
                            color="danger"
                            fullWidth
                        />
                        <Button
                            title={confirmText}
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
