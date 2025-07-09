import { View } from 'react-native';

import { useLocalSearchParams } from 'expo-router';

import { InviteHeader } from '@/components/Join/Invite/InviteHeader';
import { InviteInvited } from '@/components/Join/Invite/InviteInvited';

export default function InviteScreen() {
    const { id } = useLocalSearchParams();
    return (
        <View className="flex-1 px-6 pt-safe-offset-4 bg-white dark:bg-gray-950">
            <InviteHeader />
            <InviteInvited />
        </View>
    );
}
