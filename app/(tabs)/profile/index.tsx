import Profile from '@/components/Profile';
import { ProfileData } from '@/components/Profile/types';
import getRandomPersonsImage from '@/utils/functions/getRandomImage';

export default function SelfProfilePage() {

    // get this from our session/store
    const response: ProfileData = {
        user: {
            id: 2,
            name: 'John Doe',
            username: 'johndoe',
            image: getRandomPersonsImage(),
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
    };

    return <Profile data={response} isThisMe={true} />;
}
