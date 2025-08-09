import { View } from 'react-native';

import { useLocalSearchParams, useRouter } from 'expo-router';

import { Button } from '@/components/ui/Button';
import { InviteFriends } from '@/components/Join/Invite/InviteFriends';
import { InviteHeader } from '@/components/Join/Invite/InviteHeader';
import { useInviteScreen } from '@/hooks/room/useInviteScreen';
import { useGetInviteUserListQuery } from '@/services/featureApi';

export default function InviteScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const quizId = Array.isArray(id) ? id[0] : id;
    const { roomCode, roomHost, joinedUsers } = useInviteScreen(Number(quizId));
    const { data: users } = useGetInviteUserListQuery();

    return (
        <View className="flex-1 px-6 pt-safe-offset-4 bg-white dark:bg-gray-950">
            <InviteHeader />
            <InviteFriends roomCode={roomCode} quizId={quizId} joinedUsers={joinedUsers} users={users} />
            <Button
                title="Done, Go to Lobby"
                size="lg"
                className='mb-16'
                accessibilityLabel="Navigate to Lobby"
                accessibilityRole="button"
                onPress={() => router.push({ pathname: `/quiz/[id]/waiting`, params: { id: String(id), roomCode, roomHost } })}
            />
        </View>
    );
}
