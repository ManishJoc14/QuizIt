import { ScrollView, View } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import { QuizButtons } from '@/components/Library/QuizDetailed/QuizButtons';
import { QuizDescription } from '@/components/Library/QuizDetailed/QuizDescription';
import { QuizHeader } from '@/components/Library/QuizDetailed/QuizHeader';
import { QuizMeta } from '@/components/Library/QuizDetailed/QuizMeta';
import QuizAuthor from '@/components/Library/QuizDetailed/QuizAuthor';
import { getRandomImage } from '@/utils/functions/getRandomImage';
import QuizImage from '@/components/Library/QuizDetailed/QuizImage';

export default function QuizDetailScreen() {
    const { id } = useLocalSearchParams();

    const description = `Test your knowledge with this engaging quiz covering a mix of interesting facts and challenging questions. Whether you're here to learn something new or prove your mastery, this quiz offers a fun way to sharpen your mind. Ready to take on the challenge?`;

    const meta = {
        questions: 16,
        played: 20,
        favorited: 14
    };

    const isThisMyQuiz = true;

    return (
        <View className="flex-1 px-6 pt-safe-offset-4 bg-white dark:bg-gray-950">
            <QuizHeader isThisMyQuiz={isThisMyQuiz} />
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <QuizImage image={getRandomImage()} />
                <QuizAuthor isThisMyQuiz={isThisMyQuiz} name='Manish Joshi' username='@manishjoc14' image={getRandomImage()} />
                <QuizMeta {...meta} />
                <QuizDescription description={description} />
                <QuizButtons />
            </ScrollView>
        </View>
    );
}
