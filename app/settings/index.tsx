import { useState } from 'react';

import { ScrollView, View } from 'react-native';

import { Href, useRouter } from 'expo-router';

import { useTheme } from '@/context/ThemeContext';
import { IconSymbolName } from '@/components/ui/IconSymbol';
import { SettingsHeader } from '@/components/Profile/Settings/SettingsHeader';
import { SettingsSection } from '@/components/Profile/Settings/SettingsSection';
import { SettingsListItem } from '@/components/Profile/Settings/SettingsListItem';
import { LogoutConfirmationModal } from '@/components/Profile/Settings/Logout/LogoutModal';
import { useLogout } from '@/hooks/useLogout';

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
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
    const router = useRouter();
    const logout = useLogout();

    const navigateTo = (href: Href) => {
        router.push(href);
    };

    const handleLogoutConfirm = () => {
        logout();
    };

    const handleLogoutCancel = () => {
        console.log('Logout cancelled.');
        setIsLogoutModalVisible(false);
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
            onPress: () => navigateTo('/settings/feedback'),
            iconBgColor: "bg-green-100 dark:bg-green-700",
            iconColorLight: "#16A34A",
            iconColorDark: "#86EFAC",
        },
        {
            iconName: "questionmark",
            title: "Help Center",
            onPress: () => navigateTo('/settings/helpcenter'),
            iconBgColor: "bg-purple-100 dark:bg-purple-700",
            iconColorLight: "#8B5CF6",
            iconColorDark: "#DDD6FE",
        },
        {
            iconName: "info.circle.fill",
            title: "About Us",
            onPress: () => navigateTo('/settings/aboutus'),
            iconBgColor: "bg-pink-100 dark:bg-pink-700",
            iconColorLight: "#EC4899",
            iconColorDark: "#FBCFE8",
        },
        {
            iconName: "power",
            title: "Logout",
            onPress: () => setIsLogoutModalVisible(true),
            iconBgColor: "bg-red-100 dark:bg-red-700",
            iconColorLight: "#DC2626",
            iconColorDark: "#FCA5A5",
            rightContent: ''
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

            {/* Logout Confirmation Modal */}
            <LogoutConfirmationModal
                isVisible={isLogoutModalVisible}
                onCancel={handleLogoutCancel}
                onConfirm={handleLogoutConfirm}
            />
        </View>
    );
}