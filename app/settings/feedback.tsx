import React from 'react';

import { ScrollView, View } from 'react-native';

import { FeedbackForm } from '@/components/Profile/Settings/Feedback/FeedbackForm';
import { FeedbackHeader } from '@/components/Profile/Settings/Feedback/FeedbackHeader';

export default function FeedbackScreen() {
    const handleSubmitFeedback = (feedback: string, rating: number | null) => {
        console.log('Feedback Submitted:', { feedback, rating });
        alert('Thank you for your feedback!');
    };

    return (
        <View className="flex-1 bg-white dark:bg-gray-950">
            <FeedbackHeader />
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                <FeedbackForm onSubmit={handleSubmitFeedback} />
            </ScrollView>
        </View>
    );
}