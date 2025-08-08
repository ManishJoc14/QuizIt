import { Text } from 'react-native';

import { useRouter } from 'expo-router';

import Profile from '@/components/Profile';
import getRandomPersonsImage from '@/utils/functions/getRandomImage';
import { ProfileData } from '@/components/Profile/types';
import { useAppSelector } from '@/utils/libs/reduxHooks';
import { useGetUserProfileQuery } from '@/services/userApi';

export default function UserProfilePage() {
    const { user } = useAppSelector((state) => state.auth);
    const router = useRouter();

    const { data: userProfileRes, isLoading } = useGetUserProfileQuery({ userId: Number(user?.id) }, {
        skip: !user,
    });

    if (!user) {
        router.push('/signin');
        return null;
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
            id: Number(user.id),
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

    return <Profile data={response} isThisMe={true} />;
}