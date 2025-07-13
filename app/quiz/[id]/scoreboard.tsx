import { View, ScrollView } from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { Button } from '@/components/ui/Button';
import { PlayerListItem } from '@/components/Join/Scoreboard/ScoreboardPlayerListItem';
import { ScoreboardHeader } from '@/components/Join/Scoreboard/ScoreboardHeader';
import { TopRankers } from '@/components/Join/Scoreboard/ScoreboardToprankers';
import { ResultData, Summary } from '@/components/Join/types';

// Mock data for the scoreboard - this will be the base, updated by actual results
const MOCK_SCOREBOARD_DATA: Summary[] = [
    { id: 1, name: 'Anna', image: 'https://i.pravatar.cc/150?img=1', rank: 1, totalPoints: 140 },
    { id: 2, name: 'Manis', image: 'https://i.pravatar.cc/150?img=2', rank: 2, totalPoints: 120 },
    { id: 3, name: 'Samy', image: 'https://i.pravatar.cc/150?img=3', rank: 3, totalPoints: 110 },
    { id: 4, name: 'Ujjwal', image: 'https://i.pravatar.cc/150?img=4', rank: 4, totalPoints: 80 },
    { id: 5, name: 'Pero', image: 'https://i.pravatar.cc/150?img=5', rank: 5, totalPoints: 60 },
    { id: 6, name: 'Torpe', image: 'https://i.pravatar.cc/150?img=6', rank: 6, totalPoints: 40 },
    { id: 7, name: 'Tyra', image: 'https://i.pravatar.cc/150?img=7', rank: 7, totalPoints: 30 },
    { id: 8, name: 'Hina', image: 'https://i.pravatar.cc/150?img=8', rank: 8, totalPoints: 20 },
    { id: 9, name: 'Liam', image: 'https://i.pravatar.cc/150?img=9', rank: 9, totalPoints: 15 },
    { id: 10, name: 'Olivia', image: 'https://i.pravatar.cc/150?img=10', rank: 10, totalPoints: 10 },
];

export default function ScoreboardScreen() {
    const router = useRouter();
    const { id: quizIdParam, result } = useLocalSearchParams();

    let parsedResult: ResultData | null = null;
    if (typeof result === 'string') {
        try {
            parsedResult = JSON.parse(result);
        } catch (err) {
            console.error('Failed to parse result data in ScoreboardScreen:', err);
        }
    }

    // Create a mutable copy of the mock data to update
    let currentScoreboardData: Summary[] = [...MOCK_SCOREBOARD_DATA];

    let currentUserResult: Summary | null = null;

    if (parsedResult) {
        currentUserResult = parsedResult.summary;

        // Find the current user in the mock data and update their score/image/name
        const currentUserIndex = currentScoreboardData.findIndex(
            (player) => player.name === currentUserResult?.name
        );

        if (currentUserIndex !== -1 && currentUserResult) {
            // Update existing user
            currentScoreboardData[currentUserIndex].totalPoints = currentUserResult.totalPoints;
            currentScoreboardData[currentUserIndex].image = currentUserResult.image;
        } else if (currentUserResult) {
            // If user not found in mock data, add them (e.g., a new player)
            currentScoreboardData.push({
                id: 1000,
                name: currentUserResult.name,
                image: currentUserResult.image,
                rank: 0,
                totalPoints: currentUserResult.totalPoints,
            });
        }

        // Re-sort the entire scoreboard data based on totalPoints (descending)
        currentScoreboardData.sort((a, b) => b.totalPoints - a.totalPoints);

        // Re-assign ranks based on the new sorted order
        currentScoreboardData = currentScoreboardData.map((player, idx) => ({
            ...player,
            rank: idx + 1,
        }));
    }

    // Separate top 3 players from the rest
    const top3Players = currentScoreboardData.slice(0, 3);
    const otherPlayers = currentScoreboardData.slice(3);

    // Function to navigate to ResultsScreen
    const handleViewMyResults = () => {
        if (parsedResult && quizIdParam) {
            router.push({
                pathname: '/quiz/[id]/result',
                params: {
                    id: quizIdParam.toString(),
                    result: JSON.stringify(parsedResult),
                },
            });
        } else {
            // Handle case where no result data is available (e.g., direct access to scoreboard)
            console.warn("No quiz result data to view. Navigating to home.");
            router.push('/');
        }
    };

    return (
        <View className="flex-1 bg-violet-800">
            {/* Scoreboard Header */}
            <ScoreboardHeader />

            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                {/* Top 3 Rankers Section */}
                <TopRankers players={top3Players} />

                {/* List of Other Players */}
                <View className='mx-6 bg-white dark:bg-gray-900 rounded-t-3xl rounded-b-none pt-6 pb-2 px-2'>
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

                {/* Button at the bottom */}
                <View className="mx-6 my-6 bg-green-100 rounded-xl">
                    <Button
                        title="View My Results"
                        variant="ghost"
                        color="success"
                        size="lg"
                        fullWidth
                        onPress={handleViewMyResults}
                    />
                </View>
            </ScrollView>
        </View>
    );
}
