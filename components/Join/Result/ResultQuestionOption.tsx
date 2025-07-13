import { View, Text } from 'react-native';

import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import { useTheme } from '@/context/ThemeContext';

export function ResultQuestionOption({
    index,
    textStyle,
    bgStyle,
    option,
    icon,
}: {
    index: number;
    textStyle: string;
    bgStyle: string;
    option: string;
    icon: IconSymbolName | null;
}) {

    const { theme } = useTheme();
    let iconColor = '#4B5563'; // Default color for light theme

    if (theme === 'dark') {
        iconColor = icon === 'checkmark.circle' ? '#4ade80' : '#f87171';
    } else {
        iconColor = icon === 'checkmark.circle' ? '#16a34a' : '#dc2626';
    }

    return (
        <View
            className={`flex-row justify-between items-center rounded-xl px-4 py-4 ${bgStyle}`}
        >
            <Text className={`text-base ${textStyle}`}>
                {index + 1}. {option}
            </Text>
            {icon && (
                <IconSymbol
                    size={20}
                    name={icon}
                    color={iconColor}
                />
            )}
        </View>
    );
}