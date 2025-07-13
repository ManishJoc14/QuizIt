import React from 'react';

import { ScrollView, View } from 'react-native';

import { AboutUsHeader } from '@/components/Profile/Settings/AboutUs/AboutUsHeader';
import { AboutUsContent } from '@/components/Profile/Settings/AboutUs/AboutUsContent';
import { AboutUsMilestones } from '@/components/Profile/Settings/AboutUs/AboutUsMilestones';

export default function AboutUsScreen() {
    return (
        <View className="flex-1 bg-white dark:bg-gray-950">
            <AboutUsHeader />
            <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
                <AboutUsContent />
                <AboutUsMilestones
                    quizzes="45M"
                    plays="300M"
                    players="60M"
                />
            </ScrollView>
        </View>
    );
}
