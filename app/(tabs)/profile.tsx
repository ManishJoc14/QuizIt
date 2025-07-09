import { Image, Text, View } from 'react-native';

import { Link } from 'expo-router';

import ThemeToggleBtn from '@/components/ThemeToggleBtn';
import getRandomPersonsImage from '@/utils/functions/getRandomImage';
import { Button } from '@/components/ui/Button';

export default function Profile() {
    return (
        <View className="items-center flex-1 px-6 pt-20 bg-gray-50 dark:bg-gray-950">
            {/* Profile Photo */}
            <Image
                source={{ uri: getRandomPersonsImage(150, 6) }}
                className="w-32 h-32 mb-4 rounded-full"
            />

            {/* Username */}
            <Text className="text-2xl font-bold text-gray-800 dark:text-gray-100 ">Ujjwal</Text>
            <Text className="mb-6 text-gray-500 dark:text-gray-200">@johndoe</Text>

            <Link href="/signin" asChild>
                <Button variant="link" title="Sign in" />
            </Link>

            <ThemeToggleBtn />
        </View>
    );
}
