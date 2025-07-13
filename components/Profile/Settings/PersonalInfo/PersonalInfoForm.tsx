import React from 'react';

import { View, TextInput, Image, Pressable } from 'react-native';

import getRandomPersonsImage from '@/utils/functions/getRandomImage';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/Button';

interface PersonalInfoFormProps {
    name: string;
    email: string;
    image: string;
    password: string;
    onNameChange: (text: string) => void;
    onEmailChange: (text: string) => void;
    onImageChange: (image: string) => void;
    onPasswordChange: (text: string) => void;
    onSaveChanges: () => void;
}

export function PersonalInfoForm({
    name,
    email,
    image,
    password,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    onSaveChanges,
}: PersonalInfoFormProps) {
    const { theme } = useTheme();

    const inputBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100';
    const inputTextColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';

    const inputPlaceholderColor = theme === 'dark' ? '#e5e7eb' : '#374151';
    const iconColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';

    return (
        <>
            <View className="items-center px-4">
                <View className="relative mb-8">
                    <Image
                        source={{ uri: image || getRandomPersonsImage() }}
                        className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-950"
                    />
                    <Pressable className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2">
                        <IconSymbol name="camera.fill" size={16} color="white" />
                    </Pressable>
                </View>

                <View className="w-full gap-4">
                    <View className={`flex-row items-center p-3 rounded-xl ${inputBg}`}>
                        <IconSymbol name="person.fill" size={20} color={iconColor} />
                        <TextInput
                            className={`flex-1 ml-3 text-base ${inputTextColor}`}
                            placeholder="Name"
                            placeholderTextColor={inputPlaceholderColor}
                            value={name}
                            onChangeText={onNameChange}
                        />
                    </View>
                    <View className={`flex-row items-center p-3 rounded-xl ${inputBg} ${theme === 'dark' ? 'opacity-60' : 'opacity-50'}`}>
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
                    <View className={`flex-row items-center p-3 rounded-xl ${inputBg}`}>
                        <IconSymbol name="lock.fill" size={20} color={iconColor} />
                        <TextInput
                            className={`flex-1 ml-3 text-base ${inputTextColor}`}
                            placeholder="Enter password"
                            value={password}
                            onChangeText={onPasswordChange}
                            placeholderTextColor={inputPlaceholderColor}
                            secureTextEntry
                        />
                    </View>
                </View>
            </View>
            <Button title="Save Changes" className='mx-4 my-4' fullWidth onPress={onSaveChanges} size="lg" />
        </>
    );
}
