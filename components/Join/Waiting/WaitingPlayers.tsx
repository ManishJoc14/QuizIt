import React from 'react'

import { View, Text, Image } from 'react-native'

type WaitingPlayersProps = {
    players: { name: string, image: string }[]
};

export function WaitingPlayers({ players }: WaitingPlayersProps) {
    return (
        <View
            style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: 8,
                paddingBottom: 20,
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
        </View>
    )
}