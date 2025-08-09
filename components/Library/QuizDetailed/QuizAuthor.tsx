import React, { useState } from 'react'

import { Pressable, View } from 'react-native'

import { useRouter } from 'expo-router';

import getRandomPersonsImage from '@/utils/functions/getRandomImage'
import { Button } from '@/components/ui/Button'
import { UserAvatar } from '@/components/ui/AuthorAvatar';
import { useFavoriteQuizMutation, useFollowUserMutation, useUnFavoriteQuizMutation, useUnFollowUserMutation } from '@/services/featureApi';
import { IconSymbol } from '@/components/ui/IconSymbol';

export function QuizAuthor({ id, quizCreatorId, isFavourite, name, username, image, isThisMe, isFollowed = false }: {
    id: number,
    quizCreatorId: number,
    isFavourite: boolean,
    name: string,
    username: string,
    image?: string,
    isThisMe: boolean,
    isFollowed: boolean
}) {
    const router = useRouter();
    const [followUser] = useFollowUserMutation();
    const [unFollowUser] = useUnFollowUserMutation();
    const [isFollowedState, setIsFollowedState] = useState(isFollowed);
    const [favoriteQuiz] = useFavoriteQuizMutation();
    const [unFavoriteQuiz] = useUnFavoriteQuizMutation();

    const [isFavouriteState, setIsFavouriteState] = useState(isFavourite);

    const handleEditClick = () => {
        router.push({
            pathname: '/quiz/[id]/edit',
            params: { id: String(id) }
        });
    };

    const handleFollowClick = async () => {
        setIsFollowedState(true);
        try {
            await followUser({ followedToId: String(quizCreatorId) }).unwrap();
        }
        catch (error) {
            console.error('Failed to follow user:', error);
            setIsFollowedState(false); // Revert state if the request fails
        }
    }

    const handleUnfollowClick = async () => {
        setIsFollowedState(false);
        try {
            await unFollowUser({ followedToId: String(quizCreatorId) }).unwrap();
        }
        catch (error) {
            console.error('Failed to unfollow user:', error);
            setIsFollowedState(true); // Revert state if the request fails
        }
    }


    const handleFavoriteClick = async () => {
        setIsFavouriteState(true);
        try {
            await favoriteQuiz({ quizId: id }).unwrap();
        }
        catch (error) {
            console.error('Failed to favorite quiz:', error);
            setIsFavouriteState(false); // Revert state if the request fails
        }
    }

    const handleUnFavoriteClick = async () => {
        setIsFavouriteState(false);
        try {
            await unFavoriteQuiz({ quizId: id }).unwrap();
        }
        catch (error) {
            console.error('Failed to unfavorite quiz:', error);
            setIsFavouriteState(true); // Revert state if the request fails
        }
    }

    return (
        <View className="flex-row flex-wrap items-center justify-between gap-4 mb-8" >
            <UserAvatar name={name}
                id={id}
                username={username}
                image={image ? image : getRandomPersonsImage()} />
            <View className="flex-row mx-auto sm:mx-0 justify-center items-center gap-4">
                {(!isThisMe ? isFavouriteState ?
                    <Pressable onPress={handleUnFavoriteClick}>
                        <IconSymbol name="heart.fill" size={28} color="red" />
                    </Pressable> :
                    <Pressable onPress={handleFavoriteClick}>
                        <IconSymbol name="heart" size={28} color="red" />
                    </Pressable>
                    : null)
                }
                {isThisMe ?
                    <Button title="Edit" onPress={handleEditClick} variant="outline" color="gray" radius="full" /> :
                    isFollowedState ? <Button title="Following" onPress={handleUnfollowClick} variant="outline" radius="full" /> :
                        <Button title="Follow" onPress={handleFollowClick} variant="solid" radius="full" />
                }
            </View>
        </View >
    )
}
