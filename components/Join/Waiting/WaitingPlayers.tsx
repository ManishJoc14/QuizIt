import React from 'react'

import { View, Text, ScrollView, Image } from 'react-native'

type WaitingPlayersProps = {
    players: { name: string, image: string }[]
};

export function WaitingPlayers({ players }: WaitingPlayersProps) {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: 8,
                paddingBottom: 80,
            }}
        >
            {players.map((player, index) => (
                <View
                    key={index}
                    style={{
                        width: '20%',
                        alignItems: 'center',
                        marginBottom: 12,
                    }}
                >
                    <Image
                        source={{ uri: player.image }}
                        style={{ width: 56, height: 56, borderRadius: 56 }}
                        resizeMode="cover"
                    />
                    <Text className="text-sm text-white text-center mt-1 max-w-20"
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {player.name}
                    </Text>
                </View>
            ))}
        </ScrollView>
    )
}