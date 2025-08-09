import React, { useState } from 'react';

import { View, Text, ScrollView } from 'react-native';

import { Button } from '@/components/ui/Button';
import getRandomPersonsImage from '@/utils/functions/getRandomImage';
import { InviteUserAvatar, InviteUserAvatarDetailed } from '@/components/ui/AuthorAvatar';
import { InviteUserListResponse, UserToInvite } from '@/types/feature.types';
import { useInviteFriendMutation } from '@/services/featureApi';

export function InviteFriends({ quizId, roomCode, joinedUsers, users }: { quizId: string, roomCode: string, joinedUsers: string[], users: InviteUserListResponse }) {
    const [inviteFriend] = useInviteFriendMutation();
    const [invitedUsers, setInvitedUsers] = useState<UserToInvite[]>([]);

    const isUserInvited = (userId: string) =>
        invitedUsers.some((u) => String(u.userId) === userId);

    const isUserJoined = (username: string) =>
        joinedUsers.includes(username);

    const handleInvite = async (user: UserToInvite) => {
        if (!isUserInvited(String(user.userId))) {
            setInvitedUsers((prev) => [...prev, user]);
            try {
                await inviteFriend({
                    roomCode,
                    values: {
                        quizId,
                        invitedToId: String(user.userId),
                    },
                }).unwrap();
            }
            catch (error) {
                console.error('Failed to invite user:', error);
            }
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
                    <InviteUserAvatar
                        key={index}
                        id={user.userId}
                        name={user.username}
                        avatar={user.image ? user.image : getRandomPersonsImage()}
                        isUserJoined={isUserJoined(user.username)}
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
                            <InviteUserAvatarDetailed
                                id={user.userId}
                                name={user.username}
                                username={user.username}
                                avatar={user.image ? user.image : getRandomPersonsImage()}
                                isUserJoined={isUserJoined(user.username)}
                            />
                            <Button
                                title={isUserJoined(user.username) ? 'Joined' : invited ? 'Invited' : 'Invite'}
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
