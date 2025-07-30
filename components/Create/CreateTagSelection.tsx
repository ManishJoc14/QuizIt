import React from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface TagSelectionProps {
  availableTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  isLoading?: boolean; // to show loading state for tags
}

export function TagSelection({ availableTags, selectedTags, onTagToggle, isLoading }: TagSelectionProps) {
  const { theme } = useTheme();

  const tagBgClass = (isSelected: boolean) =>
    isSelected ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700';
  const tagTextColorClass = (isSelected: boolean) =>
    isSelected ? 'text-white' : 'text-gray-700 dark:text-gray-200';

  if (isLoading) {
    return (
      <View className="flex-row items-center justify-center py-4">
        <ActivityIndicator size="small" color={theme === 'dark' ? '#F9FAFB' : '#111827'} />
        <Text className="ml-2 text-gray-600 dark:text-gray-400">Loading tags...</Text>
      </View>
    );
  }

  if (availableTags.length === 0) {
    return (
      <View className="py-4 items-center">
        <Text className="text-gray-600 dark:text-gray-400">No tags available.</Text>
      </View>
    );
  }

  return (
    <View className="flex-row flex-wrap gap-2 mb-6">
      {availableTags.map((tag) => (
        <Pressable
          key={tag}
          onPress={() => onTagToggle(tag)}
          className={`px-4 py-2 rounded-full ${tagBgClass(selectedTags.includes(tag))}`}
        >
          <Text className={`text-sm font-medium ${tagTextColorClass(selectedTags.includes(tag))}`}>
            {tag}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
