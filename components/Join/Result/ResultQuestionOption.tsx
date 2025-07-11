import { View, Text } from 'react-native';

export function ResultQuestionOption({
    index,
    text,
    isCorrect,
    isSelected,
}: {
    index: number;
    text: string;
    isCorrect: boolean;
    isSelected: boolean;
}) {
    const correct = isCorrect ? 'text-green-600 font-semibold' : '';
    const wrong = isSelected && !isCorrect ? 'text-red-600 font-semibold' : '';
    return (
        <View className="flex-row items-center mx-2 py-1">
            <Text className={`text-sm ${correct || wrong}`}>
                {index + 1}. {text}
            </Text>
        </View>
    );
}
