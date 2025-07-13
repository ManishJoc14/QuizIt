import React from 'react'

import { View } from 'react-native'

import getRandomPersonsImage from '@/utils/functions/getRandomImage'
import { UserAvatar } from '@/components/ui/AuthorAvatar';
import { Button } from '@/components/ui/Button'
import { User } from './types';

type ProfileAuthorProps = User & {
    isThisMe?: boolean;
};

export function ProfileAuthor({ id, name, username, image, isThisMe, isFollowed }: ProfileAuthorProps) {
    return (
        <View className="flex-row items-center justify-between mb-8" >
            <UserAvatar
                id={id}
                name={name}
                username={username}
                image={image ? image : getRandomPersonsImage()} />

            {isThisMe ?
                <Button title="Edit Profile" variant="solid" color="gray" radius="full" /> :
                isFollowed ? <Button title="Following" variant="outline" radius="full" /> :
                    <Button title="Follow" variant="solid" radius="full" />}
        </View >
    )
}
