import { useLocalSearchParams } from 'expo-router';

import Profile from '@/components/Profile';
import getRandomPersonsImage from '@/utils/functions/getRandomImage';
import { ProfileData } from '@/components/Profile/types';

export default function OtherUserProfilePage() {
    const { id: someUserId } = useLocalSearchParams();

    // get this user form our session/store
    const user = {
        id: 123,
        name: 'John Doe',
        username: 'johndoe',
        image: getRandomPersonsImage(),
    }

    const isThisMe = user?.id === Number(someUserId);

    // get this from api 
    const response: ProfileData = {
        user: {
            id: Number(someUserId),
            name: isThisMe ? user.name : 'Jane Doe',
            username: isThisMe ? user.username : 'janedoe',
            image: getRandomPersonsImage(),
            isFollowed: false,
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
