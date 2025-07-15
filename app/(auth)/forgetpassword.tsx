import React, { useState } from 'react';

import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import { Link } from 'expo-router';

import { Button } from '@/components/ui/Button';
import { useForgotPassword } from '@/hooks/useForgetPassword';

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState('');
    const { requestReset, isLoading, error } = useForgotPassword();

    const handleSend = async () => {
        if (!email) return Alert.alert('Error', 'Please enter your email.');
        try {
            await requestReset(email);
        } catch {
            Alert.alert('Failed', (error as any)?.data?.message || 'Something went wrong.');
        }
    };

    return (
        <View className="flex-1 bg-gray-50 dark:bg-gray-900 pt-safe-offset-8">
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }} className="px-6">
                <View className="w-full max-w-lg border p-8 rounded-3xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <Text className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Forgot Password?</Text>
                    <Text className="mb-8 text-base text-gray-600 dark:text-gray-400">
                        Enter your email to reset your password
                    </Text>

                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter your email"
                        placeholderTextColor="#9CA3AF"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        className="px-4 py-4 mb-6 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                    />

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
