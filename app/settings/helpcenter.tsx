import React, { useState } from 'react';

import { ScrollView, View } from 'react-native';

import Toast from 'react-native-toast-message';

import { ContactUsForm } from '@/components/Profile/Settings/HelpCenter/HelpCenterContactForm';
import { FAQSection } from '@/components/Profile/Settings/HelpCenter/HelpCenterFaq';
import { HelpCenterHeader } from '@/components/Profile/Settings/HelpCenter/HelpCenterHeader';
import { HelpCenterTabs } from '@/components/Profile/Settings/HelpCenter/HelpCenterTabs';
import { useContactUsMutation } from '@/services/featureApi';

export default function HelpCenterScreen() {
    const [activeTab, setActiveTab] = useState('FAQ');
    const [submitContactUs] = useContactUsMutation();

    const handleSubmitContactForm = async (name: string, email: string, question: string) => {
        if (!name || !email || !question) {
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Please fill in all fields.',
            });
            return;
        }

        try {
            await submitContactUs({ name, email, question }).unwrap()
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Your question has been submitted successfully.',
            });
        } catch (error) {
            console.error('Failed to submit contact form:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to submit your question. Please try again later.',
            });
        };
    }

    return (
        <View className="flex-1 bg-white dark:bg-gray-950">
            <HelpCenterHeader />
            <HelpCenterTabs activeTab={activeTab} onChange={setActiveTab} />

            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                {activeTab === 'FAQ' && <FAQSection />}
                {activeTab === 'Contact Us' && <ContactUsForm onSubmit={handleSubmitContactForm} />}
            </ScrollView>
        </View>
    );
}
