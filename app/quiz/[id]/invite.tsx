import { View } from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { InviteFriends } from '@/components/Join/Invite/InviteFriends';
import { InviteHeader } from '@/components/Join/Invite/InviteHeader';
import { Button } from '@/components/ui/Button';

export default function InviteScreen() {
    const { id } = useLocalSearchParams();
    const quizId = Array.isArray(id) ? id[0] : id;
    const router = useRouter();

    return (
        <View className="flex-1 px-6 pt-safe-offset-4 bg-white dark:bg-gray-950">
            <InviteHeader />
            <InviteFriends quizId={quizId} />
            <Button
                title="Done, Go to Lobby"
                size="lg"
                className='mb-16'
                accessibilityLabel="Navigate to Lobby"
                accessibilityRole="button"
                onPress={() => router.push({ pathname: `/quiz/[id]/waiting`, params: { id: String(id) } })}
            />
        </View>
    );
}
