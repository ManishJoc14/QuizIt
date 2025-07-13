import React from 'react';
import { ScrollView, View } from 'react-native';

import { useTheme } from '@/context/ThemeContext';
import { IconSymbolName } from '@/components/ui/IconSymbol';
import { SettingsHeader } from '@/components/Profile/Settings/SettingsHeader';
import { SettingsSection } from '@/components/Profile/Settings/SettingsSection';
import { SettingsListItem } from '@/components/Profile/Settings/SettingsListItem';
import { Href, useRouter } from 'expo-router';

type SettingsItem = {
    iconName: IconSymbolName;
    title: string;
    onPress?: () => void;
    rightContent?: 'arrow' | 'toggle' | React.ReactNode;
    iconBgColor?: string;
    iconColorLight?: string;
    iconColorDark?: string;
    onToggle?: (newValue: boolean) => void;
    toggleValue?: boolean;
};

export default function SettingsScreen() {
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    const navigateTo = (href: Href) => {
        router.push(href);
    };

    const accountSettings: SettingsItem[] = [
        {
            iconName: "person.fill",
            title: "Personal information",
            onPress: () => navigateTo('/settings/personalinfo'),
            iconBgColor: "bg-blue-100 dark:bg-blue-700",
            iconColorLight: "#1E40AF",
            iconColorDark: "#93C5FD",
        },
    ];

    const appearanceSettings: SettingsItem[] = [
        {
            iconName: "moon",
            title: "Night mode",
            rightContent: 'toggle',
            onToggle: toggleTheme,
            toggleValue: theme === 'dark',
            iconBgColor: "bg-indigo-100 dark:bg-indigo-700",
            iconColorLight: "#4F46E5",
            iconColorDark: "#C7D2FE",
        },
    ];

    const otherSettings: SettingsItem[] = [
        {
            iconName: "bell",
            title: "Notification",
            onPress: () => navigateTo('/settings/notification'),
            iconBgColor: "bg-yellow-100 dark:bg-yellow-700",
            iconColorLight: "#CA8A04",
            iconColorDark: "#FDE68A",
        },
        {
            iconName: "envelope",
            title: "Feedback",
            onPress: () => console.log('Navigate to Feedback'),
            iconBgColor: "bg-green-100 dark:bg-green-700",
            iconColorLight: "#16A34A",
            iconColorDark: "#86EFAC",
        },
        {
            iconName: "questionmark",
            title: "Help Center",
            onPress: () => console.log('Navigate to Help Center'),
            iconBgColor: "bg-purple-100 dark:bg-purple-700",
            iconColorLight: "#8B5CF6",
            iconColorDark: "#DDD6FE",
        },
        {
            iconName: "info.circle.fill",
            title: "About Us",
            onPress: () => console.log('Navigate to About Us'),
            iconBgColor: "bg-pink-100 dark:bg-pink-700",
            iconColorLight: "#EC4899",
            iconColorDark: "#FBCFE8",
        },
        {
            iconName: "power",
            title: "Logout",
            onPress: () => console.log('Handle Logout'),
            iconBgColor: "bg-red-100 dark:bg-red-700",
            iconColorLight: "#DC2626",
            iconColorDark: "#FCA5A5",
        },
    ];

    return (
        <View className="flex-1 bg-white dark:bg-gray-950">
            <SettingsHeader />

            <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}>
                <SettingsSection title="ACCOUNT">
                    {accountSettings.map((item, index) => (
                        <SettingsListItem
                            key={item.title}
                            {...item}
                            isLastItem={index === accountSettings.length - 1}
                        />
                    ))}
                </SettingsSection>

                <SettingsSection title="APPEARANCE">
                    {appearanceSettings.map((item, index) => (
                        <SettingsListItem
                            key={item.title}
                            {...item}
                            isLastItem={index === appearanceSettings.length - 1}
                        />
                    ))}
                </SettingsSection>

                <SettingsSection title="OTHER SETTINGS">
                    {otherSettings.map((item, index) => (
                        <SettingsListItem
                            key={item.title}
                            {...item}
                            isLastItem={index === otherSettings.length - 1}
                        />
                    ))}
                </SettingsSection>
            </ScrollView>
        </View>
    );
}
