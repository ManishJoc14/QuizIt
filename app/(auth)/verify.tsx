import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Button } from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useVerifyEmail } from '@/hooks/useVerifyEmail';
import { useVerifyResetToken } from '@/hooks/useVerifyReset';
import { useRenewVerifyEmail } from '@/hooks/useRenewVerifyEmail';
import { useTheme } from '@/context/ThemeContext';

export default function VerifyScreen() {
    const { next, email } = useLocalSearchParams<{ next?: string; email?: string }>();
    const isReset = next === '/resetpassword';
    const router = useRouter();

    const [code, setCode] = useState('');
    const emailVerification = useVerifyEmail();
    const resetVerification = useVerifyResetToken();
    const resendEmail = useRenewVerifyEmail();

    const { theme } = useTheme();
    const inputBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100';
    const iconColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
    const placeholderColor = theme === 'dark' ? '#e5e7eb' : '#374151';
    const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';

    const verify = isReset ? resetVerification.verify : emailVerification.verify;
    const loadingVerify = isReset ? resetVerification.isLoading : emailVerification.isLoading;
    const verifyError = isReset ? resetVerification.error : emailVerification.error;

    const handleVerify = async () => {
        if (!code || code.length !== 6) {
            Alert.alert('Error', 'Please enter a valid 6-digit code.');
            return;
        }

        await verify(code);
    };

    const handleResend = async () => {
        if (!email) {
            Alert.alert('Error', 'Missing email.');
            return;
        }

        console.log('Resending verification token...');
        await resendEmail.renewToken();
    };

    return (
        <View className="flex-1 bg-gray-50 dark:bg-gray-900">
            <ScrollView
                className="px-6"
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View className="w-full max-w-lg border p-8 rounded-3xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <Text className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
                        {isReset ? 'Reset Password' : 'Verify Email'}
                    </Text>
                    <Text className="mb-8 text-base text-gray-600 dark:text-gray-400">
                        Enter the 6-digit code sent to your email.
                    </Text>

                    {/* Verification Code Input */}
                    <View className={`${inputBg} flex-row items-center px-4 py-2 mb-4 rounded-xl`}>
                        <IconSymbol name="key.fill" size={20} color={iconColor} />
                        <TextInput
                            style={{ flex: 1, marginLeft: 12 }}
                            placeholder="Enter code"
                            placeholderTextColor={placeholderColor}
                            keyboardType="number-pad"
                            maxLength={6}
                            value={code}
                            onChangeText={setCode}
                            className={`text-2xl text-center ${textColor}`}
                        />
                    </View>

                    {verifyError && (
                        <Text className="text-red-500 mb-4 text-sm">
                            {(verifyError as any)?.data?.message || 'Verification failed.'}
                        </Text>
                    )}

                    <Button
                        title={loadingVerify ? 'Verifying...' : 'Verify'}
                        size="lg"
                        fullWidth
                        onPress={handleVerify}
                        isDisabled={loadingVerify || code.length !== 6}
                    />

                    {/* Resend Section (only for email verification) */}
                    {!isReset && (
                        <View className="mt-6 items-center">
                            <Text className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                                Didn’t receive the code?
                            </Text>
                            <Button
                                variant="link"
                                title={resendEmail.isLoading ? 'Resending...' : 'Resend Code'}
                                onPress={handleResend}
                                isDisabled={resendEmail.isLoading}
                            />
                            {resendEmail.error && (
                                <Text className="text-red-500 text-sm mt-1">
                                    {(resendEmail.error as any)?.data?.message || 'Resend failed.'}
                                </Text>
                            )}
                        </View>
                    )}

                    {/* Back to Sign In Link */}
                    <View className="flex-row items-center justify-center pt-10">
                        <Text className="text-sm text-gray-600 dark:text-gray-400">Already verified? </Text>
                        <Button
                            variant="link"
                            color="primary"
                            title="Sign In"
                            onPress={() => router.replace('/signin')}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
