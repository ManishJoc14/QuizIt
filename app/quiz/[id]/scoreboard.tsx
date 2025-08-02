import { View, ScrollView } from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { Button } from '@/components/ui/Button';
import { PlayerListItem } from '@/components/Join/Scoreboard/ScoreboardPlayerListItem';
import { ScoreboardHeader } from '@/components/Join/Scoreboard/ScoreboardHeader';
import { TopRankers } from '@/components/Join/Scoreboard/ScoreboardToprankers';
import { useSocket } from '@/context/WebSocketContext';
import { useAppSelector } from '@/utils/libs/reduxHooks';


export default function ScoreboardScreen() {
    const router = useRouter();
    const { id: quizIdParam, result } = useLocalSearchParams();
    const { leaderboard } = useSocket();
    const { user } = useAppSelector((state) => state.auth);

    // Separate top 3 players from the rest
    const top3Players = leaderboard.slice(0, 3);
    const otherPlayers = leaderboard.slice(3);

    const userResult = Array.isArray(result) ? result[0] : result;
    const userSummary = leaderboard.find((player) => player.id === user?.id);
    const userRank = userSummary ? userSummary.rank : leaderboard.length + 1;

    // Function to navigate to ResultsScreen
    const handleViewMyResults = () => {
        if (quizIdParam) {
            router.push({
                pathname: '/quiz/[id]/result',
                params: {
                    id: quizIdParam.toString(),
                    result: userResult,
                    rank: userRank,
                },
            });
        } else {
            // Handle case where no result data is available (e.g., direct access to scoreboard)
            console.warn("No quiz result data to view. Navigating to home.");
            router.push('/');
        }
    };

    return (
        <View className="flex-1 bg-violet-600">
            {/* Scoreboard Header */}
            <ScoreboardHeader />

            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                {/* Top 3 Rankers Section */}
                <TopRankers players={top3Players} />

                {/* List of Other Players */}
                {otherPlayers.length > 0 &&
                    <View className='mx-6 bg-white dark:bg-gray-900 rounded-t-3xl rounded-b-none pt-4 pb-2 px-4'>
                        {otherPlayers.map((player) => (
                            <PlayerListItem
                                key={player.id}
                                id={player.id}
                                rank={player.rank}
                                name={player.name}
                                image={player.image}
                                totalPoints={player.totalPoints}
                            />
                        ))}
                    </View>
                }


                {/* Button at the bottom */}
                <View className="mx-6 my-6 rounded-xl">
                    <Button
                        title="View My Results"
                        variant="solid"
                        color="primary"
                        size="lg"
                        fullWidth
                        onPress={handleViewMyResults}
                    />
                </View>
            </ScrollView>
        </View>
    );
}
