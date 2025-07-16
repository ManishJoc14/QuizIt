import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Checkbox } from 'expo-checkbox';

import { Button } from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useSignUp } from '@/hooks/auth/useSignUp';
import { useTheme } from '@/context/ThemeContext';

export default function SignUpScreen() {
    const [fullName, setFullName] = useState('lalit');
    const [username, setUsername] = useState('lalit123');
    const [email, setEmail] = useState('lalitbhatt2081@gmail.com');
    const [password, setPassword] = useState('lalit');
    const [isFormValid, setIsFormValid] = useState(false);
    const [isChecked, setChecked] = useState(true);

    const { register, isLoading, error } = useSignUp();
    const { theme } = useTheme();

    const inputBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100';
    const iconColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
    const placeholderColor = theme === 'dark' ? '#e5e7eb' : '#374151';
    const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';

    const handleSignUp = () => {
        if (!fullName || !username || !email || !password || !isChecked) return;
        register({
            fullName,
            username,
            email,
            password,
            rePassword: password,
        });
    };

    useEffect(() => {
        const valid = fullName && username && email && password && isChecked;
        setIsFormValid(Boolean(valid));
    }, [fullName, username, email, password, isChecked]);

    return (
        <View className="flex-1 bg-gray-50 dark:bg-gray-900">
            <ScrollView
                className="px-6"
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
                showsVerticalScrollIndicator={false}
            >
                <View className="w-full max-w-lg border p-8 rounded-3xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <Text className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Welcome.</Text>
                    <Text className="mb-8 text-base text-gray-600 dark:text-gray-400">Create an account</Text>

                    {/* Full Name */}
                    <View className={`${inputBg} flex-row items-center px-4 py-2 mb-4 rounded-xl`}>
                        <IconSymbol name="person.fill" size={20} color={iconColor} />
                        <TextInput
                            style={{ flex: 1, marginLeft: 12 }}
                            placeholder="Full Name"
                            placeholderTextColor={placeholderColor}
                            value={fullName}
                            onChangeText={setFullName}
                            className={textColor}
                        />
                    </View>

                    {/* Username */}
                    <View className={`${inputBg} flex-row items-center px-4 py-2 mb-4 rounded-xl`}>
                        <IconSymbol name="person.fill" size={20} color={iconColor} />
                        <TextInput
                            style={{ flex: 1, marginLeft: 12 }}
                            placeholder="Username"
                            placeholderTextColor={placeholderColor}
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                            className={textColor}
                        />
                    </View>

                    {/* Email */}
                    <View className={`${inputBg} flex-row items-center px-4 py-2 mb-4 rounded-xl`}>
                        <IconSymbol name="envelope" size={20} color={iconColor} />
                        <TextInput
                            style={{ flex: 1, marginLeft: 12 }}
                            placeholder="Email"
                            placeholderTextColor={placeholderColor}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={email}
                            onChangeText={setEmail}
                            className={textColor}
                        />
                    </View>

                    {/* Password */}
                    <View className={`${inputBg} flex-row items-center px-4 py-2 mb-6 rounded-xl`}>
                        <IconSymbol name="lock.fill" size={20} color={iconColor} />
                        <TextInput
                            style={{ flex: 1, marginLeft: 12 }}
                            placeholder="Password"
                            placeholderTextColor={placeholderColor}
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            className={textColor}
                        />
                    </View>

                    {/* Terms */}
                    <View className="flex-row items-center mb-6">
                        <Checkbox value={isChecked} onValueChange={setChecked} className="mr-3" />
                        <Text className="text-sm text-gray-700 dark:text-gray-300">
                            I agree with{' '}
                            <Text className="text-blue-600 dark:text-blue-400">Terms and Conditions</Text>
                        </Text>
                    </View>

                    {error && (
                        <Text className="text-red-500 mb-2 text-sm">
                            {(error as any)?.data?.message || 'Signup failed. Please try again.'}
                        </Text>
                    )}

                    <Button
                        title="Sign Up"
                        size="lg"
                        fullWidth
                        onPress={handleSignUp}
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
                        leftIcon={
                            <Image
                                source={{ uri: 'https://www.google.com/favicon.ico' }}
                                className="w-5 h-5 mr-2"
                            />
                        }
                        title="Continue with Google"
                    />

                    <View className="flex-row items-center justify-center pt-10">
                        <Text className="text-sm text-gray-600 dark:text-gray-400">Already have an account? </Text>
                        <Link href="/signin" asChild>
                            <Button variant="link" color="primary" title="Sign in" />
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
