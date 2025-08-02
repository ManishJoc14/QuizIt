import React from 'react';

import { View } from 'react-native';

import { CreateHeader } from '@/components/Create/CreateHeader';
import { CreateQuizSection } from '@/components/Create/CreateQuizSection';

export default function Create() {
    return (
        <View className="flex-1 bg-white dark:bg-gray-950 pt-safe-offset-4 px-6">
            <CreateHeader />
            <CreateQuizSection />
        </View>
    );
}
