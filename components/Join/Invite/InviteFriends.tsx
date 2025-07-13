import React from 'react';

import { View, Text, ScrollView } from 'react-native';

import getRandomPersonsImage from '@/utils/functions/getRandomImage';
import { AuthorAvatar, UserAvatar } from '@/components/ui/AuthorAvatar';
import { Button } from '@/components/ui/Button';

export function InviteFriends({ id }: { id: string }) {
    const users = [
        { id: 1, name: 'Ava Thompson', username: '@ava_thompson', image: getRandomPersonsImage(), isInvited: false },
        { id: 2, name: 'Harper Evans', username: '@harper_evans', image: getRandomPersonsImage(), isInvited: true },
        { id: 3, name: 'Maya Chen', username: '@maya_chen', image: getRandomPersonsImage(), isInvited: true },
        { id: 4, name: 'Elijah Murphy', username: '@elijah_murphy', image: getRandomPersonsImage(), isInvited: true },
        { id: 5, name: 'Liam Patel', username: '@liam_patel', image: getRandomPersonsImage(), isInvited: false },
        { id: 6, name: 'Chloe Brooks', username: '@chloe_brooks', image: getRandomPersonsImage(), isInvited: true },
        { id: 7, name: 'Sofia Kim', username: '@sofia_kim', image: getRandomPersonsImage(), isInvited: false },
        { id: 8, name: 'Amelia Flores', username: '@amelia_flores', image: getRandomPersonsImage(), isInvited: true },
        { id: 9, name: 'Jackson Lee', username: '@jackson_lee', image: getRandomPersonsImage(), isInvited: false },
        { id: 10, name: 'Noah Garcia', username: '@noah_garcia', image: getRandomPersonsImage(), isInvited: false },
        { id: 11, name: 'Ella Nguyen', username: '@ella_nguyen', image: getRandomPersonsImage(), isInvited: false },
        { id: 12, name: 'Benjamin Smith', username: '@benjamin_smith', image: getRandomPersonsImage(), isInvited: false },
        { id: 13, name: 'Mason Rivera', username: '@mason_rivera', image: getRandomPersonsImage(), isInvited: true },
        { id: 14, name: 'Olivia Martinez', username: '@olivia_martinez', image: getRandomPersonsImage(), isInvited: false },
    ];

    const invitedUsers = users.filter((u) => u.isInvited);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 60 }}
            className="px-4 bg-white dark:bg-gray-950">
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
                    <AuthorAvatar key={index} id={user.id} name={user.name} avatar={user.image} />
                ))}
            </ScrollView>

            <View className="pt-6">
                <View className="flex-row items-center">
                    <Text className="text-2xl font-medium text-gray-900 dark:text-white">
                        All Friends
                    </Text>
                    <Text className="text-2xl font-medium text-indigo-500 ml-1">
                        ({users.length})
                    </Text>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ marginVertical: 10 }}
                contentContainerStyle={{ paddingBottom: 60 }}
            >
                {/* User list */}
                {users.map((user, index) => (
                    <View
                        key={index}
                        className="flex-row items-center justify-between py-4 border-b border-gray-200 dark:border-gray-800"
                    >
                        <UserAvatar
                            id={user.id}
                            name={user.name}
                            username={user.username}
                            image={user.image}
                        />
                        <Button
                            title={user.isInvited ? 'Invited' : 'Invite'}
                            variant={user.isInvited ? 'outline' : 'solid'}
                            radius="full"
                        />
                    </View>
                ))}
            </ScrollView>
        </ScrollView>
    );
}
