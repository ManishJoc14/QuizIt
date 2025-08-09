import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import { Link } from 'expo-router';

import { IconSymbol } from '@/components/ui/IconSymbol';

export function ScoreboardHeader() {
    return (
        <View className="px-6 mb-6 pt-safe-offset-4 mt-2">
            <Link href="/" asChild>
                <TouchableOpacity className='flex-row items-center'>
                    <IconSymbol name="chevron.left" size={28} color='#f9fafb' />
                    <Text className="text-gray-50 text-2xl font-medium ml-2">Home</Text>
                </TouchableOpacity>
            </Link>
            <View className="flex-row justify-center mt-4">
                <Text className="text-white text-3xl font-bold">Scoreboard</Text>
            </View>
        </View>
    );
}
