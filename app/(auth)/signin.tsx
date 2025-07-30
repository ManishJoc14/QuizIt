import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Image } from 'react-native';
import { Link } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Button } from '@/components/ui/Button';
import { useSignIn } from '@/hooks/auth/useSignIn';

export default function SignInScreen() {
    const [email, setEmail] = useState('manishjoc14@gmail.com');
    const [password, setPassword] = useState('mj');
    const [isFormValid, setIsFormValid] = useState(false);

    const { signIn, isLoading, error } = useSignIn();
    const { theme } = useTheme();

    const inputBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100';
    const iconColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
    const placeholderColor = theme === 'dark' ? '#e5e7eb' : '#374151';

    useEffect(() => {
        const valid = email && password;
        setIsFormValid(Boolean(valid));
    }, [email, password]);

    return (
        <View className="flex-1 pt-safe-offset-4 bg-gray-50 dark:bg-gray-900">
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }} className="px-6">
                <View className="w-full max-w-lg border p-8 rounded-3xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <Text className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Hello.</Text>
                    <Text className="mb-8 text-base text-gray-600 dark:text-gray-400">Welcome back</Text>

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

                    <View className={`${inputBg} flex-row items-center px-4 py-2 mb-2 rounded-xl`}>
                        <IconSymbol name="lock.fill" size={20} color={iconColor} />
                        <TextInput
                            style={{ flex: 1, marginLeft: 12 }}
                            placeholder="Enter password"
                            placeholderTextColor={placeholderColor}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            className='dark:text-gray-100 text-gray-800'
                        />
                    </View>

                    {error && <Text className="text-red-500 mb-2 text-sm">Invalid credentials or server error.</Text>}

                    <View className="flex-row justify-end mb-1">
                        <Link href="/forgetpassword" asChild>
                            <Button variant="link" color="primary" title="Forget password?" />
                        </Link>
                    </View>
                    <Button
                        title="Sign In"
                        size="lg"
                        fullWidth
                        onPress={() => signIn({ email, password })}
                        isDisabled={!isFormValid}
                        isLoading={isLoading}
                    />

                    <View className="flex-row items-center mt-8 mb-6">
                        <View className="flex-1 h-px bg-gray-200 dark:bg-gray-600" />
                        <Text className="mx-3 text-sm text-gray-500 dark:text-gray-400">or continue with</Text>
                        <View className="flex-1 h-px bg-gray-200 dark:bg-gray-600" />
                    </View>

                    <Button
                        variant="outline"
                        color="gray"
                        size="lg"
                        fullWidth
                        leftIcon={<Image source={{ uri: 'https://www.google.com/favicon.ico' }} className="w-5 h-5 mr-2" />}
                        title="Continue with Google"
                    />

                    <View className="flex-row items-center justify-center pt-10">
                        <Text className="text-sm text-gray-600 dark:text-gray-400">{"Don't"} have an account? </Text>
                        <Link href="/signup" asChild>
                            <Button variant="link" color="primary" title="Sign up" />
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
