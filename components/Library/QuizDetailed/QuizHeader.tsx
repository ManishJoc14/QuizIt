import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Pressable,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';

import { useTheme } from '@/context/ThemeContext';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';

export function QuizHeader({ isThisMe }: { isThisMe?: boolean }) {
    const router = useRouter();
    const { theme } = useTheme();

    const [showDropdown, setShowDropdown] = useState(false);

    const options = [
        {
            name: 'Edit',
            icon: 'square.and.pencil',
            show: isThisMe,
            onPress: async () => {
                await Haptics.selectionAsync();
                console.log('Edit clicked');
            },
        },
        {
            name: 'Delete',
            icon: 'trash.fill',
            show: isThisMe,
            onPress: async () => {
                await Haptics.selectionAsync();
                console.log('Delete clicked');
            },
        },
        {
            name: 'Share',
            icon: 'square.and.arrow.up',
            show: true,
            onPress: async () => {
                await Haptics.selectionAsync();
                console.log('Share clicked');
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
                {/* This Preessable acts like an invisible backdrop when clicked closes the modal. */}
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
        </View>
    );
}
