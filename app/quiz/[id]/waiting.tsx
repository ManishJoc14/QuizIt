import { View, Text } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import Toast from 'react-native-toast-message';

import { Button } from '@/components/ui/Button';
import { WaitingHeader } from '@/components/Join/Waiting/WaitingHeader';
import { WaitingPlayers } from '@/components/Join/Waiting/WaitingPlayers';
import { WaitingRoomCode } from '@/components/Join/Waiting/WaitingRoomCode';
import { getRandomImage } from '@/utils/functions/getRandomImage';
import { useStartQuizMutation } from '@/services/roomApi';
import { useWaitingScreen } from '@/hooks/room/useWaitingScreen';

export default function WaitingScreen() {
    const { id, roomCode: roomCodeParam } = useLocalSearchParams();
    const [startQuiz] = useStartQuizMutation();

    const quizId = Array.isArray(id) ? id[0] : id;
    const code = Array.isArray(roomCodeParam) ? roomCodeParam[0] : roomCodeParam;
    const { joinedUsers, isLoading, error, isHost, connected, roomCode: ROOMCODE, quizTitle } = useWaitingScreen(Number(quizId), code);

    const players = joinedUsers.map((username, index) => ({
        id: index.toString(),
        name: username,
        image: getRandomImage(800, 400),
    }));

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text>Loading room code...</Text>
            </View>
        );
    }

    const handleStartQuiz = async () => {
        try {
            const data = await startQuiz({ roomCode: ROOMCODE }).unwrap();
            Toast.show({
                type: 'success',
                text1: 'Quiz Started',
                text2: data.message || 'The quiz has started successfully.',
            })
        }
        catch (error) {
            console.error('Error starting quiz:', error);
        }
    };

    return (
        <View className="flex-1 px-6 pt-safe-offset-4 bg-violet-600 dark:bg-violet-950">
            <WaitingHeader />
            {
                error ? (
                    <View className="flex-1 justify-center items-center">
                        <Text>Error loading room code</Text>
                    </View>
                ) : (
                    <>
                        <Text className="text-center text-xl font-medium tracking-wider text-gray-100 dark:text-gray-200 my-4">
                            {connected ? isHost ? "Start Quiz" : "Waiting for host to start..." : "Connecting..."}
                        </Text>

                        <WaitingRoomCode
                            roomCode={ROOMCODE}
                            quizTitle={quizTitle}
                            image={getRandomImage(800, 400)}
                        />

                        <View className="mt-8 mb-2">
                            <Text className="text-xl font-semibold text-gray-100 dark:text-gray-200 mb-4">
                                Players Joined ({players.length})
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
                                onPress={handleStartQuiz}
                            />
                        }
                    </>
                )}
        </View>
    );
}
