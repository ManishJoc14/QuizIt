import React from "react";
import {
    View,
    Text,
    TextInput,
    ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordScreen() {
    return (
        <View className="flex-1 bg-gray-50 dark:bg-gray-900">
            <ScrollView
                className="px-6"
                contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center" }}
                showsVerticalScrollIndicator={false}
            >
                <View className="w-full max-w-lg border p-8 rounded-3xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
                    {/* Title */}
                    <Text className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Forgot Password?</Text>
                    <Text className="mb-8 text-base text-gray-600 dark:text-gray-400">
                        Enter your email to reset your password
                    </Text>

                    {/* Email Input */}
                    <Text className="mb-3 text-base font-medium text-gray-700 dark:text-gray-300">Email</Text>
                    <TextInput
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#9CA3AF"
                        className="px-4 py-4 mb-6 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                    />

                    {/* Reset Button */}
                    <Button title="Send Reset Link" size="lg" />

                    {/* Back to Sign In */}
                    <View className="flex-row items-center justify-center pt-10">
                        <Text className="text-sm text-gray-600 dark:text-gray-400">
                            Remember your password?{" "}
                        </Text>
                        <Button variant="link" color="primary">
                            <Link href="/signin">Sign in</Link>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
