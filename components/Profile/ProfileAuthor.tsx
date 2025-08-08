import React, { useState } from 'react'

import { View } from 'react-native'

import { useRouter } from 'expo-router';

import getRandomPersonsImage from '@/utils/functions/getRandomImage'
import { Button } from '@/components/ui/Button'
import { UserAvatar } from '@/components/ui/AuthorAvatar';
import { useFollowUserMutation, useUnFollowUserMutation } from '@/services/featureApi';

import { User } from './types';

type ProfileAuthorProps = User & {
    isThisMe?: boolean;
};

export function ProfileAuthor({ id, name, username, image, isThisMe, isFollowed }: ProfileAuthorProps) {
    const router = useRouter();
    const [followUser] = useFollowUserMutation();
    const [unFollowUser] = useUnFollowUserMutation();
    const [isFollowedState, setIsFollowedState] = useState(isFollowed);

    const handleFollowClick = async () => {
        setIsFollowedState(true);
        try {
            await followUser({ followedToId: String(id) }).unwrap();
        }
        catch (error) {
            console.error('Failed to follow user:', error);
            setIsFollowedState(false); // Revert state if the request fails
        }
    }

    const handleUnfollowClick = async () => {
        setIsFollowedState(false);
        try {
            await unFollowUser({ followedToId: String(id) }).unwrap();
        }
        catch (error) {
            console.error('Failed to unfollow user:', error);
            setIsFollowedState(true); // Revert state if the request fails
        }
    }

    const handleEditClick = () => {
        router.push({
            pathname: '/settings/personalinfo',
            params: { id: String(id) }
        });
    };

    return (
        <View className="flex-row items-center justify-between mb-8" >
            <UserAvatar
                id={id}
                name={name}
                username={username}
                image={image ? image : getRandomPersonsImage()} />

            {isThisMe ?
                <Button title="Edit" onPress={handleEditClick} variant="outline" color="gray" radius="full" /> :
                isFollowedState ? <Button title="Following" onPress={handleUnfollowClick} variant="outline" radius="full" /> :
                    <Button title="Follow" onPress={handleFollowClick} variant="solid" radius="full" />}
        </View >
    )
}
