import React, { useState } from 'react';

import { ScrollView, View } from 'react-native';

import { ContactUsForm } from '@/components/Profile/Settings/HelpCenter/HelpCenterContactForm';
import { HelpCenterHeader } from '@/components/Profile/Settings/HelpCenter/HelpCenterHeader';
import { HelpCenterTabs } from '@/components/Profile/Settings/HelpCenter/HelpCenterTabs';
import { FAQSection } from '@/components/Profile/Settings/HelpCenter/HelpCenterFaq';

export default function HelpCenterScreen() {
    const [activeTab, setActiveTab] = useState('FAQ');

    const handleSubmitContactForm = (name: string, email: string, question: string) => {
        // console.log('Contact Form Submitted:', { name, email, question });
        alert('Your message has been sent!');
    };

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
