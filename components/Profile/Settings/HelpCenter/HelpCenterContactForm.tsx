import React, { useState } from 'react';

import { View, TextInput } from 'react-native';

import { Button } from '@/components/ui/Button';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/context/ThemeContext';

interface ContactUsFormProps {
    onSubmit: (name: string, email: string, question: string) => void;
}

export function ContactUsForm({ onSubmit }: ContactUsFormProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [question, setQuestion] = useState('');

    const { theme } = useTheme();
    const inputBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100';
    const inputTextColor = theme === 'dark' ? 'text-gray-50' : 'text-gray-800';

    const inputPlaceholderColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
    const iconColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';

    const handleSubmit = () => {
        onSubmit(name, email, question);
        setName('');
        setEmail('');
        setQuestion('');
    };

    return (
        <>
            <View className="px-4 items-center">
                <View className="w-full gap-4 mb-6">
                    <View className={`flex-row items-center p-3 rounded-xl ${inputBg}`}>
                        <IconSymbol name="person.fill" size={20} color={iconColor} />
                        <TextInput
                            className={`flex-1 outline-none ml-3 text-base ${inputTextColor}`}
                            placeholder="Enter your name"
                            placeholderTextColor={inputPlaceholderColor}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                    <View className={`flex-row items-center p-3 rounded-xl ${inputBg}`}>
                        <IconSymbol name="envelope" size={20} color={iconColor} />
                        <TextInput
                            className={`flex-1 outline-none ml-3 text-base ${inputTextColor}`}
                            placeholder="your@gmail.com"
                            placeholderTextColor={inputPlaceholderColor}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>
                    <View className={`p-3 rounded-xl ${inputBg}`}>
                        <TextInput
                            className={`w-full outline-none h-32 text-base ${inputTextColor}`}
                            placeholder="Type your question"
                            placeholderTextColor={inputPlaceholderColor}
                            multiline
                            textAlignVertical="top"
                            value={question}
                            onChangeText={setQuestion}
                        />
                    </View>
                </View>
            </View>
            <Button title="Submit" className='my-4 mx-4' fullWidth onPress={handleSubmit} size="lg" />
        </>
    );
}
