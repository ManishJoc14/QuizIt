import { View } from 'react-native';

import { TrendingHeader } from '@/components/Home/Trending/TrendingHeader';
import { TrendingQuizSection } from '@/components/Home/Trending/TrendingQuizSection';

export default function TrendingScreen() {
    return (
        <View className="flex-1 px-4 pt-safe-offset-4 bg-white dark:bg-gray-950">
            <TrendingHeader />
            <TrendingQuizSection />
        </View>
    );
}
