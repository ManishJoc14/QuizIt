import React from 'react'

import { View } from 'react-native'

import { useRouter } from 'expo-router';

import getRandomPersonsImage from '@/utils/functions/getRandomImage'
import { Button } from '@/components/ui/Button'
import { UserAvatar } from '@/components/ui/AuthorAvatar';
import { useFavoriteQuizMutation, useFollowUserMutation, useUnFavoriteQuizMutation } from '@/services/featureApi';

export function QuizAuthor({ id, quizCreatorId, name, username, image, isThisMe, isFollowed = false }: {
    id: number,
    quizCreatorId: number,
    name: string,
    username: string,
    image?: string,
    isThisMe: boolean,
    isFollowed: boolean
}) {
    const router = useRouter();
    const [followUser] = useFollowUserMutation();
    const [favoriteQuiz] = useFavoriteQuizMutation();
    const [unFavoriteQuiz] = useUnFavoriteQuizMutation();

    const handleEditClick = () => {
        router.push({
            pathname: '/quiz/[id]/edit',
            params: { id: String(id) }
        });
    };

    const handleFollowClick = async () => {
        try {
            await followUser({ followedToId: String(quizCreatorId) }).unwrap();
        }
        catch (error) {
            console.error('Failed to follow user:', error);
        }
    }

    const handleFavoriteClick = async () => {
        try {
            await favoriteQuiz({ quizId: id }).unwrap();
        }
        catch (error) {
            console.error('Failed to favorite quiz:', error);
        }
    }

    const handleUnFavoriteClick = async () => {
        try {
            await unFavoriteQuiz({ quizId: id }).unwrap();
        }
        catch (error) {
            console.error('Failed to unfavorite quiz:', error);
        }
    }

    return (
        <View className="flex-row items-center justify-between mb-8" >
            <UserAvatar name={name}
                id={id}
                username={username}
                image={image ? image : getRandomPersonsImage()} />

            {isThisMe ?
                <Button title="Edit" onPress={handleEditClick} variant="outline" color="gray" radius="full" /> :
                isFollowed ? <Button title="Following" variant="outline" radius="full" /> :
                    <Button title="Follow" onPress={handleFollowClick} variant="solid" radius="full" />}
        </View >
    )
}
