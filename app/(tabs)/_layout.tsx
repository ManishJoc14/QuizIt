// REACT IMPORTS
import React from 'react';

// NATIVE IMPORTS
import { Platform, Pressable } from 'react-native';

// THIRD PARTY IMPORTS
import { router, Tabs } from 'expo-router';

// PROJECT IMPORTS
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import AuthGuard from '@/components/AuthGuard';
import { useAppSelector } from '@/utils/libs/reduxHooks';

export default function TabLayout() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <AuthGuard>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#3b82f6",
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
              backgroundColor: 'transparent',
              borderTopWidth: 0,
            },
            default: {
              elevation: 10,
            },
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }: { color: string }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: 'Library',
            tabBarIcon: ({ color }: { color: string }) => (
              <IconSymbol size={28} name="square.grid.2x2.fill" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="join"
          options={{
            title: 'Join',
            tabBarIcon: ({ color }: { color: string }) => (
              <IconSymbol size={28} name="gamecontroller" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: 'Create',
            tabBarIcon: ({ color }: { color: string }) => (
              <IconSymbol size={28} name="plus" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile" // can point to a blank page or leave it as is
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }: { color: string }) => (
              <IconSymbol name="person.fill" size={28} color={color} />
            ),
            // Override the tabBarButton to manually redirect
            tabBarButton: (props: any) => (
              <Pressable
                {...props}
                onPress={() => {
                  if (user?.id) {
                    router.push({
                      pathname: '/profile/[id]',
                      params: { id: user.id.toString() },
                    });
                  }
                }}
              />
            ),
          }}
        />
      </Tabs>
    </AuthGuard>
  );
}
