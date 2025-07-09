// REACT IMPORTS
import React from 'react';

// NATIVE IMPORTS
import { Platform } from 'react-native';

// THIRD PARTY IMPORTS
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

// PROJECT IMPORTS
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';

export default function TabLayout() {

  return (
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
            <IconSymbol size={28} name="folder" color={color} />
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
            <Ionicons name="person" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
