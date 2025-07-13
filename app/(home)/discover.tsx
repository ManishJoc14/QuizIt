import { View } from 'react-native';

import { DiscoverHeader } from '@/components/Home/Discover/DiscoverHeader';
import { DiscoverQuizSection } from '@/components/Home/Discover/DiscoverQuizSection';

export default function DiscoverScreen() {
    return (
        <View className="flex-1 px-4 pt-safe-offset-4 bg-white dark:bg-gray-950">
            <DiscoverHeader />
            <DiscoverQuizSection />
        </View>
    );
}
