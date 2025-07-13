import React from 'react'

import { View } from 'react-native'

import getRandomPersonsImage from '@/utils/functions/getRandomImage'
import { Button } from '@/components/ui/Button'
import { UserAvatar } from '@/components/ui/AuthorAvatar';
import { QuizData } from '@/components/Join/types';

export function QuizAuthor({ id, name, username, image, isThisMe, isFollowed }: QuizData['user']) {
    
    console.log(`QuizAuthor: ${id}, ${name}, ${username}, ${image}, ${isThisMe}, ${isFollowed}`);
    return (
        <View className="flex-row items-center justify-between mb-8" >
            <UserAvatar name={name}
                id={id}
                username={username}
                image={image ? image : getRandomPersonsImage()} />

            {isThisMe ?
                <Button title="You" variant="outline" color="gray" radius="full" /> :
                isFollowed ? <Button title="Following" variant="outline" radius="full" /> :
                    <Button title="Follow" variant="solid" radius="full" />}
        </View >
    )
}
