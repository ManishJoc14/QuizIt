import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';

import { Button } from '@/components/ui/Button';
import { useResetPassword } from '@/hooks/auth/useResetPassword';

export default function ResetPasswordScreen() {

    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const { reset, isLoading, error } = useResetPassword();

    const handleReset = async () => {
        if (!password || !rePassword) {
            Alert.alert('Error', 'Please fill both password fields.');
            return;
        }
        if (password !== rePassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }
        await reset(password, rePassword);
    };

    return (
        <View className="flex-1 bg-gray-50 dark:bg-gray-900 px-6 justify-center items-center pt-safe-offset-8">
            <Text className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">Reset Password</Text>

            <TextInput
                secureTextEntry
                placeholder="New Password"
                placeholderTextColor="#9CA3AF"
                className="w-full max-w-md px-4 py-4 mb-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                value={password}
                onChangeText={setPassword}
            />
            
            <TextInput
                secureTextEntry
                placeholder="Confirm New Password"
                placeholderTextColor="#9CA3AF"
                className="w-full max-w-md px-4 py-4 mb-6 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                value={rePassword}
                onChangeText={setRePassword}
            />

            {error && (
                <Text className="mb-4 text-red-500 text-center">
                    {(error as any)?.data?.message || 'Password reset failed.'}
                </Text>
            )}

            <Button
                title={isLoading ? 'Resetting...' : 'Reset Password'}
                size="lg"
                fullWidth
                isDisabled={isLoading || !password || !rePassword}
                onPress={handleReset}
            />
        </View>
    );
}
