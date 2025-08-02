import React from 'react'

import { View } from 'react-native'

import { useRouter } from 'expo-router';

import getRandomPersonsImage from '@/utils/functions/getRandomImage'
import { Button } from '@/components/ui/Button'
import { UserAvatar } from '@/components/ui/AuthorAvatar';

export function QuizAuthor({ id, name, username, image, isThisMe, isFollowed = false }: {
    id: number,
    name: string,
    username: string,
    image?: string,
    isThisMe: boolean,
    isFollowed: boolean
}) {
    const router = useRouter();

    const handleClick = () => {
        router.push({
            pathname: '/quiz/[id]/edit',
            params: { id: String(id) }
        });
    }

    return (
        <View className="flex-row items-center justify-between mb-8" >
            <UserAvatar name={name}
                id={id}
                username={username}
                image={image ? image : getRandomPersonsImage()} />

            {isThisMe ?
                <Button title="Edit" onPress={handleClick} variant="outline" color="gray" radius="full" /> :
                isFollowed ? <Button title="Following" variant="outline" radius="full" /> :
                    <Button title="Follow" variant="solid" radius="full" />}
        </View >
    )
}
