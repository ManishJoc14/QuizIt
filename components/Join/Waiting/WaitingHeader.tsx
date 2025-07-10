import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import { useRouter } from 'expo-router';

import { IconSymbol } from '@/components/ui/IconSymbol';

export function WaitingHeader() {
    const router = useRouter();
    return (
        <View className='flex-row items-center justify-between mb-6'>
            <TouchableOpacity onPress={() => router.back()}>
                <View className='flex-row items-center gap-2'>
                    <IconSymbol
                        name="chevron.left"
                        size={28}
                        color="#f3f4f6"
                    />
                    <Text className="text-2xl tracking-wider font-semibold text-gray-100">
                        Library
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
