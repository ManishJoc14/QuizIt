import { View, ScrollView } from 'react-native';

import { PlayerListItem } from '@/components/Join/Scoreboard/ScoreboardPlayerListItem';
import { ScoreboardHeader } from '@/components/Join/Scoreboard/ScoreboardHeader';
import { TopRankers } from '@/components/Join/Scoreboard/ScoreboardToprankers';
import { useSocket } from '@/context/WebSocketContext';

export default function HostScreen() {
    const { leaderboard } = useSocket();

    console.log("Host is in the host screen");

    // Separate top 3 players from the rest
    const top3Players = leaderboard.slice(0, 3);
    const otherPlayers = leaderboard.slice(3);

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
                    </View>}
            </ScrollView>
        </View>
    );
}
