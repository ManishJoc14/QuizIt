import { View, Text, TouchableOpacity } from 'react-native';

import { Link } from 'expo-router';

import { IconSymbol } from '@/components/ui/IconSymbol';

export function ResultHeader() {
    return (
        <View className="flex-row gap-3 items-center px-6 mb-6">
            <Link href="/" asChild>
                <TouchableOpacity>
                    <IconSymbol name="multiply.circle" size={28} color="#f9fafb" />
                </TouchableOpacity>
            </Link>
            <Text className="text-gray-50 text-2xl font-semibold">My Results</Text>
        </View>
    );
}
