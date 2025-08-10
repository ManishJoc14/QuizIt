import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';

import { Button } from '@/components/ui/Button';
import { UserAvatar } from '@/components/ui/AuthorAvatar';
import {
    useFollowUserMutation,
    useGetTopAuthorsListQuery,
    useUnFollowUserMutation
} from '@/services/featureApi';
import { useAppSelector } from '@/utils/libs/reduxHooks';

function AuthorItem({ author, currentUser }: {
    author: {
        id: number;
        name: string;
        username: string;
        image?: string;
        isFollowed: boolean;
    };
    currentUser: string;
}) {
    const [followUser] = useFollowUserMutation();
    const [unFollowUser] = useUnFollowUserMutation();
    const [isFollowed, setIsFollowed] = useState(author.isFollowed);

    const handleFollowClick = async () => {
        setIsFollowed(true);
        try {
            await followUser({ followedToId: String(author.id) }).unwrap();
        } catch (error) {
            console.error('Failed to follow user:', error);
            setIsFollowed(false);
        }
    };

    const handleUnfollowClick = async () => {
        setIsFollowed(false);
        try {
            await unFollowUser({ followedToId: String(author.id) }).unwrap();
        } catch (error) {
            console.error('Failed to unfollow user:', error);
            setIsFollowed(true);
        }
    };

    return (
        <View className="flex-row items-center justify-between py-4 border-b border-gray-200 dark:border-gray-800">
            <UserAvatar
                id={author.id}
                name={author.name}
                username={author.username}
                image={author.image}
            />

            {author.username === currentUser ? (
                <Button
                    title="You"
                    variant="solid"
                    className="px-4 py-2 rounded-full"
                    disabled
                />
            ) : isFollowed ? (
                <Button
                    title="Following"
                    variant="outline"
                    radius="full"
                    onPress={handleUnfollowClick}
                />
            ) : (
                <Button
                    title="Follow"
                    variant="solid"
                    radius="full"
                    onPress={handleFollowClick}
                />
            )}
        </View>
    );
}

export function AuthorsSection() {
    const { data: authorsData } = useGetTopAuthorsListQuery();
    const { user } = useAppSelector(state => state.auth);
    const userName = user?.username || 'Guest';

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginVertical: 10 }}
            contentContainerStyle={{ paddingBottom: 100 }}
        >
            {authorsData?.data.map((author, index) => (
                <AuthorItem key={index} author={author} currentUser={userName} />
            ))}
        </ScrollView>
    );
}
