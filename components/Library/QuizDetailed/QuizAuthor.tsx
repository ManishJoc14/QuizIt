import React from 'react'

import { View } from 'react-native'

import getRandomPersonsImage from '@/utils/functions/getRandomImage'
import { Button } from '@/components/ui/Button'
import { UserAvatar } from '@/components/ui/AuthorAvatar';

export function QuizAuthor({ name, username, image, isThisMyQuiz }: { name?: string, username?: string, image?: string, isThisMyQuiz?: boolean }) {

    // if not do i follow him/her?
    const isFollowed = false;

    return (
        <View className="flex-row items-center justify-between mb-8" >
            <UserAvatar name={name}
                username={username}
                image={image ? image : getRandomPersonsImage()} />

            {isThisMyQuiz ?
                <Button title="You" variant="outline" color="gray" radius="full" /> :
                isFollowed ? <Button title="Following" variant="outline" radius="full" /> :
                    <Button title="Follow" variant="solid" radius="full" />}
        </View >
    )
}
