import React from 'react';

import { ScrollView, View } from 'react-native';

import Toast from 'react-native-toast-message';

import { FeedbackForm } from '@/components/Profile/Settings/Feedback/FeedbackForm';
import { FeedbackHeader } from '@/components/Profile/Settings/Feedback/FeedbackHeader';
import { useFeedbackMutation } from '@/services/featureApi';
import { Reaction } from '@/types/feature.types';

export default function FeedbackScreen() {
    const [submitFeedback] = useFeedbackMutation();

    const handleSubmitFeedback = async (feedbackMessage: string, reaction: Reaction) => {
        if (!feedbackMessage || !reaction) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please provide your feedback and select a reaction.',
            });
            return;
        }

        try {
            await submitFeedback({ reaction, feedbackMessage }).unwrap();
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Thank you for your feedback!',
            });
        } catch (error) {
            console.error('Failed to submit feedback:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to submit your feedback. Please try again later.',
            });
        }
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