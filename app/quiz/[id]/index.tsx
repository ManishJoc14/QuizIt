import { ScrollView, View } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import getRandomPersonsImage, { getRandomImage } from '@/utils/functions/getRandomImage';
import { QuizDescription } from '@/components/Library/QuizDetailed/QuizDescription';
import { QuizButtons } from '@/components/Library/QuizDetailed/QuizButtons';
import { QuizAuthor } from '@/components/Library/QuizDetailed/QuizAuthor';
import { QuizHeader } from '@/components/Library/QuizDetailed/QuizHeader';
import { QuizImage } from '@/components/Library/QuizDetailed/QuizImage';
import { QuizMeta } from '@/components/Library/QuizDetailed/QuizMeta';
import { QuizData } from '@/components/Join/types';

export default function QuizDetailScreen() {
    const { id } = useLocalSearchParams();
    const quizId = Array.isArray(id) ? id[0] : id;

    const response: QuizData = {
        user: {
            id: 2,
            name: 'John Doe',
            username: 'johndoe',
            image: getRandomPersonsImage(),
            isThisMe: true,
            isFollowed: false,
        },
        meta: {
            questions: 16,
            played: 20,
            favorited: 14,
            description: `Test your knowledge with this engaging quiz covering a mix of interesting facts and challenging questions. Whether you're here to learn something new or prove your mastery, this quiz offers a fun way to sharpen your mind. Ready to take on the challenge?`
        },
    };

    return (
        <View className="flex-1 px-4 pt-safe-offset-4 bg-gray-50 dark:bg-gray-950 border">
            <QuizHeader isThisMe={response.user.isThisMe} />
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <QuizImage image={getRandomImage()} />
                <QuizAuthor {...response.user} />
                <QuizMeta {...response.meta} />
                <QuizDescription description={response.meta.description} />
                <QuizButtons id={quizId} />
            </ScrollView>
        </View>
    );
}
