// REACT IMPORTS
import React from 'react';

// NATIVE IMPORTS
import { Platform } from 'react-native';

// THIRD PARTY IMPORTS
import { Tabs } from 'expo-router';

// PROJECT IMPORTS
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import AuthGuard from '@/components/AuthGuard';

export default function TabLayout() {

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
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: 'Library',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="square.grid.2x2.fill" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="join"
          options={{
            title: 'Join',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="gamecontroller" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => (
              <IconSymbol name="person.fill" size={28} color={color} />
            ),
          }}
        />
      </Tabs>
    </AuthGuard>
  );
}
