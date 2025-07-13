import React from 'react'
import { View, ScrollView } from 'react-native'

import { Button } from '@/components/ui/Button';
import { UserAvatar } from '@/components/ui/AuthorAvatar';
import getRandomPersonsImage from '@/utils/functions/getRandomImage';

export function AuthorsSection() {
    const topAuthors = [
        { name: 'Ava Thompson', username: '@ava_thompson', image: getRandomPersonsImage(), isFollowed: false },
        { name: 'Harper Evans', username: '@harper_evans', image: getRandomPersonsImage(), isFollowed: true },
        { name: 'Maya Chen', username: '@maya_chen', image: getRandomPersonsImage(), isFollowed: true },
        { name: 'Elijah Murphy', username: '@elijah_murphy', image: getRandomPersonsImage(), isFollowed: true },
        { name: 'Liam Patel', username: '@liam_patel', image: getRandomPersonsImage(), isFollowed: false },
        { name: 'Chloe Brooks', username: '@chloe_brooks', image: getRandomPersonsImage(), isFollowed: true },
        { name: 'Sofia Kim', username: '@sofia_kim', image: getRandomPersonsImage(), isFollowed: false },
        { name: 'Amelia Flores', username: '@amelia_flores', image: getRandomPersonsImage(), isFollowed: true },
        { name: 'Jackson Lee', username: '@jackson_lee', image: getRandomPersonsImage(), isFollowed: false },
        { name: 'Noah Garcia', username: '@noah_garcia', image: getRandomPersonsImage(), isFollowed: false },
        { name: 'Ella Nguyen', username: '@ella_nguyen', image: getRandomPersonsImage(), isFollowed: false },
        { name: 'Benjamin Smith', username: '@benjamin_smith', image: getRandomPersonsImage(), isFollowed: false },
        { name: 'Mason Rivera', username: '@mason_rivera', image: getRandomPersonsImage(), isFollowed: true },
        { name: 'Olivia Martinez', username: '@olivia_martinez', image: getRandomPersonsImage(), isFollowed: false },
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