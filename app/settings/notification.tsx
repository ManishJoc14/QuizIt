import React, { useState } from 'react';

import { ScrollView, View } from 'react-native';

import { SettingsSection } from '@/components/Profile/Settings/SettingsSection';
import { NotificationHeader } from '@/components/Profile/Settings/Notification/NotificationHeader';
import { NotificationToggleItem } from '@/components/Profile/Settings/Notification/NotificationToggleItem';

export default function NotificationScreen() {
    const [newFollowersEnabled, setNewFollowersEnabled] = useState(true);
    const [appUpdatesEnabled, setAppUpdatesEnabled] = useState(false);

    return (
        <View className="flex-1 bg-white dark:bg-gray-950">
            <NotificationHeader />
            <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}>
                <SettingsSection title="NOTIFICATION">
                    <NotificationToggleItem
                        title="New Followers"
                        isEnabled={newFollowersEnabled}
                        onToggle={setNewFollowersEnabled}
                    />
                    <NotificationToggleItem
                        title="App Updates"
                        isEnabled={appUpdatesEnabled}
                        onToggle={setAppUpdatesEnabled}
                        isLastItem={true}
                    />
                </SettingsSection>
            </ScrollView>
        </View>
    );
}