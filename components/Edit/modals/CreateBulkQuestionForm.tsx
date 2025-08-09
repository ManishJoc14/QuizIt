import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Alert } from 'react-native';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/context/ThemeContext';
import { Question } from '@/types/quiz.types';

interface BulkQuestionFormProps {
    onSave: (questions: Question[]) => void;
    onCancel: () => void;
}

export function BulkQuestionForm({ onSave, onCancel }: BulkQuestionFormProps) {
    const { theme } = useTheme();
    const [jsonInput, setJsonInput] = useState('');

    const inputBg = theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100';
    const inputTextColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-800';
    const inputPlaceholderColor = theme === 'dark' ? '#9CA3AF' : '#6B7280';
    const labelTextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

    const handleSave = () => {
        try {
            const parsedQuestions: Partial<Question>[] = JSON.parse(jsonInput);
            if (!Array.isArray(parsedQuestions) || parsedQuestions.some(q => !q.question || !Array.isArray(q.options) || typeof q.correctOption !== 'number' || typeof q.points !== 'number' || typeof q.duration !== 'number')) {
                Alert.alert('Invalid JSON', 'Please ensure the JSON array contains valid question objects with "question", "options", "correctOption", "points", and "duration".');
                return;
            }

            const questions = parsedQuestions.map((q, index) => ({
                question: q.question!,
                options: q.options!,
                correctOption: q.correctOption!,
                points: q.points!,
                duration: q.duration!,
                questionIndex: index,
            }));

            onSave(questions);
            setJsonInput('');
        } catch (error) {
            Alert.alert('Invalid JSON', 'The input is not a valid JSON format. Please check your syntax.');
            console.error('Bulk add error:', error);
        }
    };

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 80 }}
            showsVerticalScrollIndicator={false}
        >
            <Text className={`text-lg font-semibold mb-3 ${labelTextColor}`}>Questions (Paste as JSON array)</Text>
            <TextInput
                className={`w-full outline-none h-60 p-3 rounded-xl text-lg ${inputBg} ${inputTextColor} mb-12`}
                placeholder={`[\n  {\n    "question": "Capital of Nepal?",\n    "options": ["Kathmandu", "Delhi", "Dhaka", "Lhasa"],\n    "correctOption": 0,\n    "points": 10,\n    "duration": 30\n  }\n]`}
                placeholderTextColor={inputPlaceholderColor}
                multiline
                textAlignVertical="top"
                value={jsonInput}
                onChangeText={setJsonInput}
            />
            <View className="flex-row justify-around gap-3">
                <Button title="Cancel" onPress={onCancel} variant="outline" color="danger" size="lg" fullWidth />
                <Button title="Add Questions" onPress={handleSave} variant="solid" color="primary" size="lg" fullWidth />
            </View>
        </ScrollView>
    );
}