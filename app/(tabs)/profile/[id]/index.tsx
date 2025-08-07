import { useLocalSearchParams, useRouter } from 'expo-router';

import Profile from '@/components/Profile';
import getRandomPersonsImage from '@/utils/functions/getRandomImage';
import { ProfileData } from '@/components/Profile/types';
import { useAppSelector } from '@/utils/libs/reduxHooks';

export default function UserProfilePage() {
    const { id: someUserId } = useLocalSearchParams();
    const { user } = useAppSelector((state) => state.auth);
    const router = useRouter();

    if (!user) {
        router.push('/signin');
        return null;
    }

    const isThisMe = user?.id === Number(someUserId);

    // get this from api 
    const response: ProfileData = {
        user: {
            id: isThisMe ? user?.id : Number(someUserId),
            name: isThisMe ? user.fullName : 'Jane Doe',
            username: isThisMe ? user.username : 'janedoe',
            image: user.photo || getRandomPersonsImage(),
            isFollowed: false
        },
        meta: {
            quizzes: 5,
            played: 30,
            players: 80,
            rank: 12,
            followers: 70,
            following: 50,
        },
    };

    return <Profile data={response} isThisMe={isThisMe} />;
}
