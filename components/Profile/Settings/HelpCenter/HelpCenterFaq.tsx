import React from 'react';

import { Text, View } from 'react-native';

import { Accordion } from '@/components/ui/Accordion';
import { useTheme } from '@/context/ThemeContext';

interface FAQItem {
    question: string;
    answer: string;
}

const FAQ_DATA: FAQItem[] = [
    {
        question: 'How do I reset my password?',
        answer: 'You can reset your password by going to the "Personal Information" section in settings and clicking on the password field.',
    },
    {
        question: 'How can I change my profile picture?',
        answer: 'You can change your profile picture from the "Personal Information" section by tapping on your current profile image.',
    },
    {
        question: 'What is Night mode?',
        answer: 'Night mode changes the app\'s color scheme to a darker palette, which can be easier on your eyes in low-light conditions.',
    },
    {
        question: 'How do I receive notifications?',
        answer: 'You can manage your notification preferences, such as new followers and app updates, in the "Notification" section of the settings.',
    },
    {
        question: 'Where can I send feedback?',
        answer: 'You can send us feedback directly through the "Feedback" section in the settings menu. We appreciate your input!',
    },
    {
        question: 'Is there a help center or support?',
        answer: 'Yes, this "Help Center" provides answers to common questions. For further assistance, you can use the "Contact Us" tab.',
    },
];

export function FAQSection() {
    const { theme } = useTheme();
    const accordionIconColor = theme === 'dark' ? '#E5E7EB' : '#4B5563';

    return (
        <View className="px-4">
            {FAQ_DATA.map((item, index) => (
                <View key={index} className="mb-4 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <Accordion
                        title={item.question}
                        iconColor={accordionIconColor}
                        titleClassName="text-lg text-gray-900 dark:text-white leading-6"
                        headerClassName="flex-row justify-between items-center px-4 py-4 dark:bg-gray-800"
                        bodyClassName='dark:bg-gray-800'
                    >
                        <View className={`px-4 py-4 border-t border-gray-200 dark:border-gray-700`}>
                            <Text className="text-gray-700 dark:text-gray-300 text-base">
                                {item.answer}
                            </Text>
                        </View>
                    </Accordion>
                </View>
            ))}
        </View>
    );
}
