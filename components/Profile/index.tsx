import { ScrollView, View } from 'react-native';

import { ProfileCoverImage } from '@/components/Profile/ProfileCoverImage';
import { ProfileAuthor } from '@/components/Profile/ProfileAuthor';
import { ProfileHeader } from '@/components/Profile/ProfileHeader';
import { ProfileMeta } from '@/components/Profile/ProfileMeta';
import { ProfileData } from '@/components/Profile/types';
import { ProfileQuizzes } from '@/components/Profile/ProfileQuizzes';

type ProfileProps = {
    data: ProfileData;
    isThisMe?: boolean; 
};

export default function Profile({ data }: ProfileProps) {
    return (
        <View className="flex-1 bg-white dark:bg-gray-950 px-4 pt-safe-offset-5 pb-2">
            <ProfileHeader  />
            <ScrollView
                className="my-4"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <ProfileCoverImage />
                <ProfileAuthor {...data.user} />
                <ProfileMeta {...data.meta} />
                <ProfileQuizzes />
            </ScrollView>
        </View>
    );
}
