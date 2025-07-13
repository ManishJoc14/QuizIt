import React from 'react'
import { View, ScrollView } from 'react-native'

import { Button } from '@/components/ui/Button';
import { UserAvatar } from '@/components/ui/AuthorAvatar';
import getRandomPersonsImage from '@/utils/functions/getRandomImage';

export function AuthorsSection() {
    const topAuthors = [
        { id: 1, name: 'Ava Thompson', username: '@ava_thompson', image: getRandomPersonsImage(), isFollowed: false },
        { id: 2, name: 'Harper Evans', username: '@harper_evans', image: getRandomPersonsImage(), isFollowed: true },
        { id: 3, name: 'Maya Chen', username: '@maya_chen', image: getRandomPersonsImage(), isFollowed: true },
        { id: 4, name: 'Elijah Murphy', username: '@elijah_murphy', image: getRandomPersonsImage(), isFollowed: true },
        { id: 5, name: 'Liam Patel', username: '@liam_patel', image: getRandomPersonsImage(), isFollowed: false },
        { id: 6, name: 'Chloe Brooks', username: '@chloe_brooks', image: getRandomPersonsImage(), isFollowed: true },
        { id: 7, name: 'Sofia Kim', username: '@sofia_kim', image: getRandomPersonsImage(), isFollowed: false },
        { id: 8, name: 'Amelia Flores', username: '@amelia_flores', image: getRandomPersonsImage(), isFollowed: true },
        { id: 9, name: 'Jackson Lee', username: '@jackson_lee', image: getRandomPersonsImage(), isFollowed: false },
        { id: 10, name: 'Noah Garcia', username: '@noah_garcia', image: getRandomPersonsImage(), isFollowed: false },
        { id: 11, name: 'Ella Nguyen', username: '@ella_nguyen', image: getRandomPersonsImage(), isFollowed: false },
        { id: 12, name: 'Benjamin Smith', username: '@benjamin_smith', image: getRandomPersonsImage(), isFollowed: false },
        { id: 13, name: 'Mason Rivera', username: '@mason_rivera', image: getRandomPersonsImage(), isFollowed: true },
        { id: 14, name: 'Olivia Martinez', username: '@olivia_martinez', image: getRandomPersonsImage(), isFollowed: false },
    ];

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginVertical: 10 }}
            contentContainerStyle={{ paddingBottom: 100 }}
        >
            {/* User list */}
            {topAuthors.map((author, index) => (
                <View
                    key={index}
                    className="flex-row items-center justify-between py-4 border-b border-gray-200 dark:border-gray-800"
                >
                    <UserAvatar
                        id={author.id}
                        name={author.name}
                        username={author.username}
                        image={author.image}
                    />
                    <Button
                        title={author.isFollowed ? 'Following' : 'Follow'}
                        variant={author.isFollowed ? 'outline' : 'solid'}
                        radius="full"
                    />
                </View>
            ))}
        </ScrollView>
    )
}