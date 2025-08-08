import React from 'react'

import { View } from 'react-native'

import { useRouter } from 'expo-router';

import getRandomPersonsImage from '@/utils/functions/getRandomImage'
import { Button } from '@/components/ui/Button'
import { UserAvatar } from '@/components/ui/AuthorAvatar';
import { useFollowUserMutation } from '@/services/featureApi';

import { User } from './types';

type ProfileAuthorProps = User & {
    isThisMe?: boolean;
};

export function ProfileAuthor({ id, name, username, image, isThisMe, isFollowed }: ProfileAuthorProps) {
    const router = useRouter();
    const [followUser] = useFollowUserMutation();

    const handleEditClick = () => {
        router.push({
            pathname: '/quiz/[id]/edit',
            params: { id: String(id) }
        });
    };

    const handleFollowClick = async () => {
        try {
            await followUser({ followedToId: String(id) }).unwrap();
        }
        catch (error) {
            console.error('Failed to follow user:', error);
        }
    }

    return (
        <View className="flex-row items-center justify-between mb-8" >
            <UserAvatar
                id={id}
                name={name}
                username={username}
                image={image ? image : getRandomPersonsImage()} />

            {isThisMe ?
                <Button title="Edit" onPress={handleEditClick} variant="outline" color="gray" radius="full" /> :
                isFollowed ? <Button title="Following" variant="outline" radius="full" /> :
                    <Button title="Follow" onPress={handleFollowClick} variant="solid" radius="full" />}
        </View >
    )
}
