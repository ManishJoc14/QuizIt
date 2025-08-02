import React from 'react';

import { View } from 'react-native';

import { useRouter } from 'expo-router';

import { Button } from '@/components/ui/Button';

export function QuizButtons({ id }: { id: string }) {
    const router = useRouter();

    return (
        <View className="flex-row flex-1 gap-4 justify-between mb-20">
            {/* <Button
                fullWidth
                variant="outline"
                title="Play Solo"
                size="lg"
            /> */}
            <Button
                fullWidth
                variant="solid"
                title="Play with Friends"
                onPress={() => router.push({ pathname: '/quiz/[id]/invite', params: { id: String(id) } })}
                size="lg"
            />
        </View>
    );
}
