import React, { useState } from 'react';
import { View } from 'react-native';

import { JoinHeader } from '@/components/Join/JoinHeader';
import { JoinInput } from '@/components/Join/JoinInput';
import { JoinButton } from '@/components/Join/JoinButton';

export default function Join() {
    const [code, setCode] = useState('');

    const handleJoin = () => {
        console.log('Joining with code:', code);
        // TODO: Implement room join logic
    };

    return (
        <View className="flex-1 bg-white dark:bg-gray-950 pt-safe-offset-4 px-6">
            <JoinHeader />
            <JoinInput code={code} setCode={setCode} />
            <JoinButton onPress={handleJoin} />
        </View>
    );
}
