import React from 'react';
import {
    Image,
    Text,
    TextInput,
    View,
    ScrollView,
} from 'react-native';
import { Link } from 'expo-router';
import { Button } from '@/components/ui/Button';

export default function LoginScreen() {
    return (
        <View className="flex-1 bg-gray-50 dark:bg-gray-900">
            <ScrollView
                className="px-6"
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
                showsVerticalScrollIndicator={false}
            >
                <View className="w-full max-w-lg border p-8 rounded-3xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
                    {/* Title */}
                    <Text className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Hello.</Text>
                    <Text className="mb-8 text-base text-gray-600 dark:text-gray-400">Welcome back</Text>

                    {/* Email */}
                    <Text className="mb-3 text-base font-medium text-gray-700 dark:text-gray-300">Email</Text>
                    <TextInput
                        placeholder="Enter email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#9CA3AF"
                        className="px-4 py-4 mb-6 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                    />

                    {/* Password */}
                    <Text className="mb-3 text-base font-medium text-gray-600 dark:text-gray-300">Password</Text>
                    <TextInput
                        placeholder="Enter password"
                        secureTextEntry
                        placeholderTextColor="#9CA3AF"
                        className="px-4 py-4 mb-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                    />

                    <Link href="/forgetpassword" className="text-right mb-6 text-blue-600 dark:text-blue-300">
                        Forget password?
                    </Link>

                    {/* Sign In Button */}
                    <Button title="Sign In" size="lg" />

                    {/* Divider */}
                    <View className="flex-row items-center mt-8 mb-6">
                        <View className="flex-1 h-px bg-gray-200 dark:bg-gray-600" />
                        <Text className="mx-3 text-sm text-gray-500 dark:text-gray-400">or continue with</Text>
                        <View className="flex-1 h-px bg-gray-200 dark:bg-gray-600" />
                    </View>

                    {/* Google Sign-In */}
                    <Button
                        variant="outline"
                        color="gray"
                        size="lg"
                        title="Continue with Google"
                        leftIcon={
                            <Image
                                source={{ uri: 'https://www.google.com/favicon.ico' }}
                                className="w-5 h-5 mr-2"
                            />
                        }
                    />

                    {/* Bottom Sign-up Prompt */}
                    <View className="flex-row items-center justify-center pt-10">
                        <Text className="text-sm text-gray-600 dark:text-gray-400">{`Don't`} have an account? </Text>
                        <Button variant="link" color="primary">
                            <Link href="/signup">Sign up</Link>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
