import React from 'react';
import { View, TextInput, Image, Pressable, Text } from 'react-native';

import getRandomPersonsImage from '@/utils/functions/getRandomImage';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/Button';
import { pickImage } from '@/utils/libs/pickImage';

interface PersonalInfoFormProps {
    fullName: string;
    username: string;
    email: string;
    imageUri: string;                      // only URI string for preview here
    onFullNameChange: (text: string) => void;
    onUsernameChange: (text: string) => void;
    onEmailChange: (text: string) => void;
    onImageChange: (data: { uri: string; file: File }) => void;  // handler accepts both uri & file
    onSaveChanges: () => void;
    isUsernameUnique?: boolean;
    isUsernameChecking?: boolean;
    isFormValid: boolean;
}

export function PersonalInfoForm({
    fullName,
    username,
    email,
    imageUri,
    onFullNameChange,
    onUsernameChange,
    onEmailChange,
    onSaveChanges,
    onImageChange,
    isUsernameUnique,
    isUsernameChecking,
    isFormValid,
}: PersonalInfoFormProps) {
    const { theme } = useTheme();

    const inputBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100';
    const inputTextColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';

    const inputPlaceholderColor = theme === 'dark' ? '#e5e7eb' : '#374151';
    const iconColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';

    return (
        <View className="flex-1 items-center px-6 py-8">
            {/* Profile Image */}
            <View className="relative mb-8">
                <Image
                    source={{ uri: imageUri || getRandomPersonsImage() }}
                    className="w-28 h-28 rounded-full border-4 border-white shadow-md"
                />
                <Pressable
                    className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-3 shadow-lg"
                    onPress={async () => {
                        const result = await pickImage();
                        if (result) {
                            onImageChange(result);  // result: { uri, file }
                        }
                    }}
                >
                    <IconSymbol name="camera.fill" size={18} color="white" />
                </Pressable>
            </View>

            {/* Form Container */}
            <View className={`w-full max-w-md bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-lg space-y-4`}>
                {/* Full Name */}
                <View className={`flex-row items-center px-4 py-3 rounded-xl ${inputBg}`}>
                    <IconSymbol name="person.fill" size={20} color={iconColor} />
                    <TextInput
                        className={`flex-1 ml-3 text-base ${inputTextColor}`}
                        placeholder="Full Name"
                        placeholderTextColor={inputPlaceholderColor}
                        value={fullName}
                        onChangeText={onFullNameChange}
                    />
                </View>

                {/* Username */}
                <View className={`flex-row items-center px-4 py-3 rounded-xl ${inputBg}`}>
                    <IconSymbol name="person.fill" size={20} color={iconColor} />
                    <TextInput
                        className={`flex-1 ml-3 text-base ${inputTextColor}`}
                        placeholder="Username"
                        placeholderTextColor={inputPlaceholderColor}
                        value={username}
                        onChangeText={onUsernameChange}
                    />
                </View>
                {!isUsernameUnique && (
                    <Text className="text-red-500 text-sm">Username already exists, please choose another one.</Text>
                )}

                {/* Email */}
                <View className={`flex-row items-center px-4 py-3 rounded-xl ${inputBg} opacity-60`}>
                    <IconSymbol name="envelope" size={20} color={iconColor} />
                    <TextInput
                        className={`flex-1 ml-3 text-base ${inputTextColor}`}
                        placeholder="Email"
                        placeholderTextColor={inputPlaceholderColor}
                        value={email}
                        onChangeText={onEmailChange}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        editable={false}
                    />
                </View>

                {/* Save Changes Button */}
                <Button
                    title="Save Changes"
                    className="mt-4"
                    fullWidth
                    onPress={onSaveChanges}
                    size="lg"
                    isLoading={isUsernameChecking}
                    isDisabled={!isFormValid || !isUsernameUnique}
                />
            </View>
        </View>
    );
}
