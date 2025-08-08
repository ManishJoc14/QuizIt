import { ScrollView, Text, View } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import { getRandomImage } from '@/utils/functions/getRandomImage';
import { QuizDescription } from '@/components/Library/QuizDetailed/QuizDescription';
import { QuizButtons } from '@/components/Library/QuizDetailed/QuizButtons';
import { QuizAuthor } from '@/components/Library/QuizDetailed/QuizAuthor';
import { QuizHeader } from '@/components/Library/QuizDetailed/QuizHeader';
import { QuizImage } from '@/components/Library/QuizDetailed/QuizImage';
import { QuizMeta } from '@/components/Library/QuizDetailed/QuizMeta';
import { useGetQuizByIdQuery } from '@/services/quizApi';

export default function QuizDetailScreen() {
    const { id } = useLocalSearchParams();
    const quizId = Array.isArray(id) ? id[0] : id;
    const { data: quiz, isLoading } = useGetQuizByIdQuery(Number(quizId));

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>Loading...</Text>
            </View>
        );
    }

    console.log("Quiz Data:", quiz);

    return (
        <View className="flex-1 px-4 pt-safe-offset-4 bg-gray-50 dark:bg-gray-950 border">
            <QuizHeader isThisMe={quiz?.data.isThisMe} />
            {
                (!quiz || !quiz.data) ? (
                    <View className="flex-1 items-center justify-center">
                        <Text>No quizzes found</Text>
                    </View>
                ) : (
                    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                        <QuizImage image={quiz.data.coverPhoto || getRandomImage()} />
                        <QuizAuthor
                            id={quiz.data.id}
                            quizCreatorId={quiz.data.quizCreatorId}
                            name={quiz.data.author}
                            username={quiz.data.author}
                            image={quiz.data.image ? quiz.data.image : getRandomImage()}
                            isThisMe={quiz.data.isThisMe}
                            isFollowed={quiz.data.isFollowed}
                            isFavourite={quiz.data.isFavourite}
                        />
                        <View className='w-full web:flex web:flex-row web:gap-4'>
                            <QuizMeta
                                questions={quiz.data.count}
                                played={quiz.data.plays}
                                favorited={quiz.data.favouriteCount}
                            />
                            <QuizDescription description={quiz.data.description} />
                        </View>
                        <QuizButtons id={quizId} />
                    </ScrollView>
                )}
        </View >
    );
}
