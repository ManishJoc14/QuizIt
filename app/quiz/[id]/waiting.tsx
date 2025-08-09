import { View, Text, ScrollView } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import Toast from 'react-native-toast-message';

import { Button } from '@/components/ui/Button';
import { WaitingHeader } from '@/components/Join/Waiting/WaitingHeader';
import { WaitingPlayers } from '@/components/Join/Waiting/WaitingPlayers';
import { WaitingRoomCode } from '@/components/Join/Waiting/WaitingRoomCode';
import { useStartQuizMutation } from '@/services/roomApi';
import { useWaitingScreen } from '@/hooks/room/useWaitingScreen';

export default function WaitingScreen() {
    const { id, roomCode: roomCodeParam, roomHost: roomHostParam } = useLocalSearchParams();
    const [startQuiz] = useStartQuizMutation();

    const quizId = Array.isArray(id) ? id[0] : id;
    const code = Array.isArray(roomCodeParam) ? roomCodeParam[0] : roomCodeParam;
    const host = Array.isArray(roomHostParam) ? roomHostParam[0] : roomHostParam;
    const { joinedUsers, quizTitle, isLoading, error, isHost, connected, roomCode: ROOMCODE, quizImage } = useWaitingScreen({ id: Number(quizId), roomCode: code, roomHost: host });

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
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
                {
                    error ? (
                        <View className="flex-1 justify-center items-center">
                            <Text>Error loading room code</Text>
                        </View>
                    ) : (
                        <>
                            <Text className="text-center text-xl font-medium tracking-wider text-gray-100 dark:text-gray-200 my-2">
                                {connected ? isHost ? "Start Quiz" : "Waiting for host to start..." : "Connecting..."}
                            </Text>

                            <WaitingRoomCode
                                roomCode={ROOMCODE}
                                quizTitle={quizTitle}
                                image={quizImage}
                            />

                            <View className="mt-6 mb-2">
                                <Text className="text-xl font-semibold text-gray-100 dark:text-gray-200 mb-4">
                                    Players Joined ({joinedUsers.length})
                                </Text>
                            </View>

                            <WaitingPlayers players={joinedUsers} />

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
            </ScrollView>
        </View>
    );
}
