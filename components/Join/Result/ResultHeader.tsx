import { View, Text, Pressable } from 'react-native';

import { useRouter } from 'expo-router';

import { IconSymbol } from '@/components/ui/IconSymbol';

export function ResultHeader() {
    const router = useRouter();
    return (
        <View className="px-6 mb-6 mt-2">
            <Pressable onPress={() => router.back()} className='flex-row items-center'>
                <IconSymbol name="chevron.left" size={28} color='#f9fafb' />
                <Text className="text-gray-50 text-2xl font-medium">Scoreboard</Text>
            </Pressable>
        </View>
    );
}
