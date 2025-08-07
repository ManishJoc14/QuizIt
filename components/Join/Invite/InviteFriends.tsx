import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

import { AuthorAvatar, UserAvatar } from '@/components/ui/AuthorAvatar';
import { Button } from '@/components/ui/Button';
import { useGetInviteUserListQuery } from '@/services/featureApi';
import { UserToInvite } from '@/types/feature.types';
import getRandomPersonsImage from '@/utils/functions/getRandomImage';

export function InviteFriends({ quizId }: { quizId: string }) {
    const { data: users } = useGetInviteUserListQuery();
    const [invitedUsers, setInvitedUsers] = useState<UserToInvite[]>([]);

    const isUserInvited = (userId: string) =>
        invitedUsers.some((u) => String(u.userId) === userId);

    const handleInvite = (user: UserToInvite) => {
        if (!isUserInvited(String(user.userId))) {
            setInvitedUsers((prev) => [...prev, user]);
        }
    };

    if (!users) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text className="text-gray-500">Loading users...</Text>
            </View>
        );
    }

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 60 }}
            className="px-4 bg-white dark:bg-gray-950"
        >
            {/* Invited Friends Section */}
            <View className="pt-4">
                <View className="flex-row items-center mb-2">
                    <Text className="text-2xl font-medium text-gray-900 dark:text-white">
                        Invited Friends
                    </Text>
                    <Text className="text-2xl font-medium text-indigo-500 ml-1">
                        ({invitedUsers.length})
                    </Text>
                </View>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingRight: 60 }}
                className="py-6 border-b border-gray-200 dark:border-gray-800"
            >
                {invitedUsers.map((user, index) => (
                    <AuthorAvatar
                        key={index}
                        id={user.userId}
                        name={user.username}
                        avatar={user.image ? user.image : getRandomPersonsImage()}
                    />
                ))}
            </ScrollView>

            {/* All Friends Section */}
            <View className="pt-6">
                <View className="flex-row items-center">
                    <Text className="text-2xl font-medium text-gray-900 dark:text-white">
                        All Friends
                    </Text>
                    <Text className="text-2xl font-medium text-indigo-500 ml-1">
                        ({users.data.length})
                    </Text>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginVertical: 10 }}
                contentContainerStyle={{ paddingBottom: 60 }}
            >
                {users.data.map((user, index) => {
                    const invited = isUserInvited(String(user.userId));
                    return (
                        <View
                            key={index}
                            className="flex-row items-center justify-between py-4 border-b border-gray-200 dark:border-gray-800"
                        >
                            <UserAvatar
                                id={user.userId}
                                name={user.username}
                                username={user.username}
                                image={user.image ? user.image : getRandomPersonsImage()}
                            />
                            <Button
                                title={invited ? 'Invited' : 'Invite'}
                                variant={invited ? 'outline' : 'solid'}
                                radius="full"
                                onPress={() => handleInvite(user)}
                                disabled={invited}
                            />
                        </View>
                    );
                })}
            </ScrollView>
        </ScrollView>
    );
}
