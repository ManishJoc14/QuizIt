import { Text } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import Profile from '@/components/Profile';
import getRandomPersonsImage from '@/utils/functions/getRandomImage';
import { ProfileData } from '@/components/Profile/types';
import { useGetUserProfileQuery } from '@/services/userApi';

export default function UserProfilePage() {
    const { id } = useLocalSearchParams();

    const userId = Array.isArray(id) ? id[0] : id;

    const { data: userProfileRes, isLoading } = useGetUserProfileQuery({ userId: Number(userId) }, {
        skip: !userId,
    });

    if (!userId) {
        return (
            <Text className="text-center text-gray-500">
                Cannot load user profile. User ID is missing.
            </Text>
        );
    }

    if (isLoading || !userProfileRes) {
        return (
            <Text className="text-center text-gray-500">
                Loading user profile...
            </Text>
        )
    }

    const response: ProfileData = {
        user: {
            id: Number(userId),
            name: userProfileRes.data.userData.fullName,
            username: userProfileRes.data.userData.username,
            image: userProfileRes.data.userData.photo || getRandomPersonsImage(),
            isFollowed: userProfileRes.data.userData.isFollowed,
        },
        meta: {
            quizzes: userProfileRes.data.userData.quizzes,
            followers: userProfileRes.data.userData.follower,
            following: userProfileRes.data.userData.following,
        },
    };

    return <Profile data={response} isThisMe={false} />;
}
