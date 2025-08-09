import React from 'react'
import { View, ScrollView } from 'react-native'

import { Button } from '@/components/ui/Button';
import { UserAvatar } from '@/components/ui/AuthorAvatar';
import { useGetTopAuthorsListQuery } from '@/services/featureApi';
import { useAppSelector } from '@/utils/libs/reduxHooks';

export function AuthorsSection() {
    const { data: authorsData } = useGetTopAuthorsListQuery();
    const { user } = useAppSelector(state => state.auth);

    const userName = user?.username || 'Guest';

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginVertical: 10 }}
            contentContainerStyle={{ paddingBottom: 100 }}
        >
            {/* User list */}
            {authorsData?.data.map((author, index) => (
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

                    {
                        author.username === userName ? (
                            <Button
                                title="You"
                                variant="solid"
                                className="px-4 py-2 rounded-full"
                                disabled
                            />
                        ) : (
                            <Button
                                title={author.isFollowed ? 'Following' : 'Follow'}
                                variant={author.isFollowed ? 'outline' : 'solid'}
                                radius="full"
                            />
                        )
                    }

                </View>
            ))}
        </ScrollView>
    )
}