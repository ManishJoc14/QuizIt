import { View, Text } from 'react-native';

import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';

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
                    color={icon === 'checkmark.circle' ? '#16a34a' : '#dc2626'}
                />
            )}
        </View>
    );
}