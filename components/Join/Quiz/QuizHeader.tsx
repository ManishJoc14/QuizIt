import { View, Text } from 'react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/context/ThemeContext';

export function QuizHeader({ current, total }: { current: number; total: number }) {
    const { theme } = useTheme();
    return (
        <View className="flex-row justify-between items-center pt-safe-offset-4 mt-2 mb-6 px-6">
            <Text className="text-2xl font-medium tracking-wider text-gray-800 dark:text-white">{current}/{total}</Text>
            <Text className="text-2xl font-semibold tracking-wider text-gray-800 dark:text-white">Quiz</Text>
            <IconSymbol
                name="ellipsis"
                size={28}
                color={theme === 'dark' ? '#6B7280' : '#111827'}
            />
        </View>
    );
}
