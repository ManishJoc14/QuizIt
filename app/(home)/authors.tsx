import { View } from 'react-native';

import { AuthorsSection } from '@/components/Home/Authors/AuthorsSection';
import { AuthorsHeader } from '@/components/Home/Authors/AuthorsHeader';

export default function AuthorsScreen() {
    return (
        <View className="flex-1 px-4 pt-safe-offset-4 bg-white dark:bg-gray-950">
            <AuthorsHeader />
            <AuthorsSection />
        </View>
    );
}
