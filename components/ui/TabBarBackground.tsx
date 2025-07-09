import React from 'react';

import { View } from 'react-native';

import { useTheme } from '@/context/ThemeContext';

export default function TabBarBackground() {
  const { theme } = useTheme();
  return (
    <View style={{ backgroundColor: theme === "dark" ? '#1f2937' : "#ffffff", width: '100%', height: '100%' }} />
  );
}

export function useBottomTabOverflow() {
  return 0;
}
