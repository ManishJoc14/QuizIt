import React, { useState } from 'react';

import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import { Link } from 'expo-router';

import { Button } from '@/components/ui/Button';
import { useForgotPassword } from '@/hooks/auth/useForgetPassword';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/context/ThemeContext';

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState('');
    const { requestReset, isLoading, error } = useForgotPassword();
    const { theme } = useTheme();
    
    const handleSend = async () => {
        if (!email) return Alert.alert('Error', 'Please enter your email.');
        await requestReset(email);
    };

    const inputBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100';
    const iconColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
    const placeholderColor = theme === 'dark' ? '#e5e7eb' : '#374151';


    return (
        <View className="flex-1 bg-gray-50 dark:bg-gray-900 pt-safe-offset-8">
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }} className="px-6">
                <View className="w-full max-w-lg border p-8 rounded-3xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <Text className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Forgot Password?</Text>
                    <Text className="mb-8 text-base text-gray-600 dark:text-gray-400">
                        Enter your email to reset your password
                    </Text>

                    <View className={`${inputBg} flex-row items-center px-4 py-2 mb-4 rounded-xl`}>
                        <IconSymbol name="envelope" size={20} color={iconColor} />
                        <TextInput
                            style={{ flex: 1, marginLeft: 12 }}
                            placeholder="Enter email"
                            placeholderTextColor={placeholderColor}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                            className='dark:text-gray-100 text-gray-800'
                        />
                    </View>

                    <Button
                        title={isLoading ? 'Sending...' : 'Send Reset Code'}
                        size="lg"
                        fullWidth
                        onPress={handleSend}
                        isDisabled={isLoading || !email}
                    />
                    {error && <Text className="text-red-500 text-sm mt-2">{(error as any)?.data?.message}</Text>}

                    <View className="flex-row items-center justify-center pt-10">
                        <Text className="text-sm text-gray-600 dark:text-gray-400">Remember password? </Text>
                        <Link href="/signin" asChild>
                            <Button variant="link" color="primary" title="Sign in" />
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
