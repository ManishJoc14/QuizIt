import { View, Text } from 'react-native';
import { QuizOption } from './QuizOption';

type Props = {
    question: string;
    options: string[];
    correctIndex: number;
    selectedIndex: number | null;
    onSelect: (index: number) => void;
    points: number;
    isAnswered: boolean;
};

export function QuizQuestion({ question, options, correctIndex, selectedIndex, onSelect, points, isAnswered }: Props) {
    return (
        <View className="flex-1 bg-white dark:bg-gray-900 rounded-xl p-6 m-4 shadow-md">
            <View className="mb-4">
                <View className="flex-row justify-between items-center">
                    <Text className="text-lg text-gray-500 dark:text-gray-300">
                        Question
                    </Text>
                    <Text className="text-indigo-600 dark:text-indigo-400 font-medium text-xl">{points} 🏆</Text>
                </View>
                <Text className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 my-2">
                    {question}
                </Text>
            </View>


            {options.map((option, i) => (
                <QuizOption
                    key={i}
                    index={i}
                    label={option}
                    isSelected={selectedIndex === i}
                    isCorrect={i === correctIndex}
                    isAnswered={isAnswered}
                    onSelect={() => onSelect(i)}
                />
            ))}
        </View>
    );
}
