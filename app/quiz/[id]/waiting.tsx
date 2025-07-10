import { View, Text, Image, ScrollView } from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { WaitingHeader } from '@/components/Join/Waiting/WaitingHeader';
import { getRandomImage } from '@/utils/functions/getRandomImage';
import WaitingRoomCode from '@/components/Join/Waiting/WaitingRoomCode';
import { Button } from '@/components/ui/Button';
import { WaitingPlayers } from '@/components/Join/Waiting/WaitingPlayers';

export default function WaitingScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const roomCode = '238311';
    const quizTitle = 'Mind Bender: The Trivia Test'
    const noOfPlayersJoined = 14;

    const isHost = true;

    const players = [
        { name: 'Alice', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
        { name: 'Bob', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { name: 'Charlie', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { name: 'Diana', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
        { name: 'Ethan', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
        { name: 'Fiona', image: 'https://randomuser.me/api/portraits/women/6.jpg' },
        { name: 'George', image: 'https://randomuser.me/api/portraits/men/7.jpg' },
        { name: 'Hannah', image: 'https://randomuser.me/api/portraits/women/8.jpg' },
        { name: 'Ivan', image: 'https://randomuser.me/api/portraits/men/9.jpg' },
        { name: 'Julia', image: 'https://randomuser.me/api/portraits/women/10.jpg' },
        { name: 'Kevin', image: 'https://randomuser.me/api/portraits/men/11.jpg' },
        { name: 'Laura', image: 'https://randomuser.me/api/portraits/women/12.jpg' },
        { name: 'Mike', image: 'https://randomuser.me/api/portraits/men/13.jpg' },
        { name: 'Nina', image: 'https://randomuser.me/api/portraits/women/14.jpg' },
        { name: 'Alice', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
        { name: 'Bob', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { name: 'Charlie', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { name: 'Diana', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
        { name: 'Ethan', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
        { name: 'Fiona', image: 'https://randomuser.me/api/portraits/women/6.jpg' },
        { name: 'George', image: 'https://randomuser.me/api/portraits/men/7.jpg' },
        { name: 'Hannah', image: 'https://randomuser.me/api/portraits/women/8.jpg' },
        { name: 'Ivan', image: 'https://randomuser.me/api/portraits/men/9.jpg' },
        { name: 'Julia', image: 'https://randomuser.me/api/portraits/women/10.jpg' },
        { name: 'Kevin', image: 'https://randomuser.me/api/portraits/men/11.jpg' },
        { name: 'Laura', image: 'https://randomuser.me/api/portraits/women/12.jpg' },
        { name: 'Mike', image: 'https://randomuser.me/api/portraits/men/13.jpg' },
        { name: 'Nina', image: 'https://randomuser.me/api/portraits/women/14.jpg' },
    ];


    return (
        <View className="flex-1 px-6 pt-safe-offset-4 bg-violet-600 dark:bg-violet-950">
            <WaitingHeader />

            <Text className="text-center text-xl font-medium tracking-wider text-gray-100 dark:text-gray-200 my-4">
                Waiting for players...
            </Text>

            <WaitingRoomCode
                roomCode={roomCode}
                quizTitle={quizTitle}
                image={getRandomImage(800, 400)}
            />

            <View className="mt-8 mb-2">
                <Text className="text-xl font-semibold text-gray-100 dark:text-gray-200 mb-4">
                    Players Joined ({noOfPlayersJoined})
                </Text>
            </View>

            <WaitingPlayers players={players} />

            {/* Start button */}
            {
                isHost &&
                <Button
                    title="Start Quiz"
                    size="lg"
                    className='mb-16'
                    accessibilityLabel="Start Quiz"
                    accessibilityRole="button"
                    onPress={() => router.push({ pathname: `/quiz/[id]/start`, params: { id } })}
                />
            }
        </View>
    );
}
