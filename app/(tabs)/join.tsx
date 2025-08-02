import React from 'react';
import { View } from 'react-native';

import { JoinHeader } from '@/components/Join/JoinHeader';
import { JoinInput } from '@/components/Join/JoinInput';
import { JoinButton } from '@/components/Join/JoinButton';
import { useJoinRoom } from '@/hooks/room/useJoinRoom';

export default function Join() {
    const { code, setCode, handleJoin } = useJoinRoom();

    return (
        <View className="flex-1 bg-white dark:bg-gray-950 pt-safe-offset-4 px-6">
            <JoinHeader />
            <JoinInput code={code} setCode={setCode} />
            <JoinButton onPress={handleJoin} />
        </View>
    );
}
