import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Pressable,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { useTheme } from '@/context/ThemeContext';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import Toast from 'react-native-toast-message';
import { ConfirmationModal } from '@/components/ConfirmModal';
import { useDeteleQuizMutation } from '@/services/userApi';

export function QuizHeader({ isThisMe }: { isThisMe?: boolean }) {
    const router = useRouter();
    const { theme } = useTheme();
    const { id } = useLocalSearchParams();
    const quizId = Array.isArray(id) ? id[0] : id;

    const [deleteQuiz] = useDeteleQuizMutation();

    const [showDropdown, setShowDropdown] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const handleDeleteConfirm = async () => {
        try {
            await deleteQuiz({ id: Number(quizId) }).unwrap();
            Toast.show({
                type: 'success',
                text1: 'Quiz deleted successfully!',
            });
            setShowConfirmModal(false);
            router.back();
        } catch (error) {
            console.log('Failed to delete quiz:', error);
            Toast.show({
                type: 'error',
                text1: 'Failed to delete quiz',
                text2: 'Please try again later.',
            });
        }
    };

    const options = [
        {
            name: 'Edit',
            icon: 'square.and.pencil',
            show: isThisMe,
            onPress: async () => {
                await Haptics.selectionAsync();
                router.push({
                    pathname: '/quiz/[id]/edit',
                    params: { id: String(quizId) }
                });
            },
        },
        {
            name: 'Delete',
            icon: 'trash.fill',
            show: isThisMe,
            onPress: async () => {
                await Haptics.selectionAsync();
                setShowDropdown(false);
                setShowConfirmModal(true);
            },
        },
        {
            name: 'Share',
            icon: 'square.and.arrow.up',
            show: true,
            onPress: async () => {
                await Haptics.selectionAsync();
                const url = `https://quizit.expo.app/quiz/${quizId}`;
                await navigator.clipboard.writeText(url);
                Toast.show({
                    type: 'success',
                    text1: 'Quiz URL copied to clipboard!',
                    text2: 'You can now share it with others.',
                });
            },
        },
    ];

    return (
        <View className='mb-6'>
            {/* Header Row */}
            <View className="flex-row justify-between items-center">
                <TouchableOpacity onPress={() => router.back()}>
                    <View className="flex-row items-center gap-2">
                        <IconSymbol
                            name="chevron.left"
                            size={28}
                            color={theme === 'dark' ? '#6B7280' : '#111827'}
                        />
                        <Text className="text-2xl tracking-wider font-semibold text-gray-900 dark:text-white">
                            Library
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setShowDropdown(true)}>
                    <IconSymbol
                        name="ellipsis"
                        size={28}
                        color={theme === 'dark' ? '#6B7280' : '#111827'}
                    />
                </TouchableOpacity>
            </View>

            {/* Modal for dropdown */}
            <Modal
                transparent
                visible={showDropdown}
                animationType="fade"
                onRequestClose={() => setShowDropdown(false)}
            >
                <Pressable
                    className="flex-1"
                    onPress={() => setShowDropdown(false)}
                >
                    <View className="absolute right-4 top-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 z-50 w-36">
                        {options
                            .filter((opt) => opt.show)
                            .map((option) => (
                                <Pressable
                                    key={option.name}
                                    onPress={option.onPress}
                                    className="flex-row items-center gap-3 px-4 py-3"
                                    android_ripple={{
                                        color: theme === 'dark' ? '#374151' : '#E5E7EB',
                                    }}
                                >
                                    <IconSymbol
                                        name={option.icon as IconSymbolName}
                                        size={22}
                                        color={theme === 'dark' ? '#D1D5DB' : '#4B5563'}
                                    />
                                    <Text className="text-base text-gray-800 dark:text-white">
                                        {option.name}
                                    </Text>
                                </Pressable>
                            ))}
                    </View>
                </Pressable>
            </Modal>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isVisible={showConfirmModal}
                message="This action cannot be undone. Do you want to delete this quiz?"
                onCancel={() => setShowConfirmModal(false)}
                onConfirm={handleDeleteConfirm}
                confirmText="Delete"
                cancelText="Cancel"
            />
        </View>
    );
}
