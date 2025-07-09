import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { IOrder } from './types';

const filters = ['Newest', 'Ratings', 'Plays'];

export function LibraryFilters({
    activeFilter,
    onChange,
    ordering,
    onOrderingChange,
    total,
}: {
    activeFilter: string;
    onChange: (filter: string) => void;
    ordering: IOrder;
    onOrderingChange: (order: IOrder) => void;
    total: number;
}) {
    const handlePress = (filter: string) => {
        if (filter === activeFilter) {
            // Toggle the ordering
            onOrderingChange(ordering === 'asc' ? 'desc' : 'asc');
        } else {
            // Change filter and reset to ascending
            onChange(filter);
            onOrderingChange('asc');
        }
    };

    return (
        <View className="flex-row justify-between items-center mb-2">
            <Text className="text-xl text-gray-800 font-semibold dark:text-gray-300">
                {total} Quizzes
            </Text>

            <View className="flex-row space-x-5">
                {filters.map((filter) => {
                    const isActive = activeFilter === filter;
                    const iconName =
                        isActive && ordering === 'asc'
                            ? 'chevron.up'
                            : isActive && ordering === 'desc'
                                ? 'chevron.down'
                                : 'arrow.up.and.down';

                    return (
                        <TouchableOpacity
                            key={filter}
                            onPress={() => handlePress(filter)}
                            className="flex-row items-center"
                        >
                            <Text
                                className={`text-base ml-4 ${isActive
                                    ? 'text-indigo-500  font-medium'
                                    : 'text-gray-500 dark:text-gray-400'
                                    }`}
                            >
                                {filter}
                            </Text>
                            <IconSymbol
                                name={iconName}
                                size={20}
                                color={isActive ? '#4F46E5' : '#6366f1'}
                            />
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}
