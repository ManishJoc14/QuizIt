import { View, Text } from 'react-native';

export function QuizFeedback({
    isCorrect,
    isTimeout = false,
    points,
}: {
    isCorrect: boolean | null;
    isTimeout?: boolean;
    points: number;
}) {
    const bgColor = isCorrect === true ? 'bg-green-600' : isTimeout ? 'bg-yellow-600' : 'bg-red-600';

    return (
        <View className={`w-full py-10 pt-safe-offset-6 px-4 ${bgColor} rounded-b-3xl `}>
            <Text className="text-white text-2xl font-semibold text-center">
                {isTimeout
                    ? 'Time\'s up!'
                    : isCorrect
                        ? 'Correct!'
                        : 'Incorrect!'}
            </Text>

            <View className="mt-2 flex items-center">
                {isCorrect === true ? (
                    <View className="bg-white px-4 py-2 rounded-full flex-row items-center">
                        <Text className="text-green-600 text-xl font-semibold mr-1">
                            +{points} 🏆
                        </Text>
                    </View>
                ) : isTimeout ? (
                    <View className="bg-white px-4 py-2 rounded-full">
                        <Text className="text-yellow-600 font-medium text-lg">
                            You ran out of time!
                        </Text>
                    </View>
                ) : (
                    <View className="bg-white px-4 py-2 rounded-full">
                        <Text className="text-red-600 font-medium text-lg">
                            Fyuhhh.. That was close
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
}
