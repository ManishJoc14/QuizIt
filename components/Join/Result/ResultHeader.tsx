import { View, Text, TouchableOpacity } from 'react-native';

import { Link } from 'expo-router';

import { IconSymbol } from '@/components/ui/IconSymbol';

export function ResultHeader() {
    return (
        <View className="px-6 mb-6">
            <Link href="/" asChild className='flex-row items-center'>
                <TouchableOpacity>
                    <IconSymbol name="chevron.left" size={28} color='#f9fafb' />
                    <Text className="text-gray-50 text-2xl font-medium">Home</Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
}
