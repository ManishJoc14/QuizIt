import { View } from 'react-native';

import { ProfileCoverImage } from '@/components/Profile/ProfileCoverImage';
import getRandomPersonsImage from '@/utils/functions/getRandomImage';
import { ProfileAuthor } from '@/components/Profile/ProfileAuthor';
import { ProfileHeader } from '@/components/Profile/ProfileHeader';
import { ProfileMeta } from '@/components/Profile/ProfileMeta';
import { ProfileData } from '@/components/Profile/types';
import ThemeToggleBtn from '@/components/ThemeToggleBtn';

export default function Profile() {

    const response: ProfileData = {
        user: {
            name: 'John Doe',
            username: 'johndoe',
            image: getRandomPersonsImage(),
            isThisMe: true,
            isFollowed: false,
        },
        meta: {
            quizzes: 10,
            played: 50,
            players: 200,
            rank: 5,
            followers: 100,
            following: 75,
        },
    }

    return (
        <View className="flex-1 bg-white dark:bg-gray-950 px-4 pt-safe-offset-5 pb-2">
            <ProfileHeader />
            <ProfileCoverImage />
            <ProfileAuthor {...response.user} />
            <ProfileMeta {...response.meta} />
            <ThemeToggleBtn />
        </View>
    );
}
