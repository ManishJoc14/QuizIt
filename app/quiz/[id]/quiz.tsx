import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';

import { QuizHeader } from '@/components/Join/Quiz/QuizHeader';
import { QuizTimer } from '@/components/Join/Quiz/QuizTimer';
import { QuizQuestion } from '@/components/Join/Quiz/QuizQuestion';
import { QuizFeedback } from '@/components/Join/Quiz/QuizFeedback';
import getRandomPersonsImage from '@/utils/functions/getRandomImage';

type Question = {
    id: number;
    index: number;
    question: string;
    options: string[];
    correctAnswer: string;
    points: number;
    time: number; // in milliseconds
};

type ResultItem = {
    id: number;
    question: string;
    options: string[];
    correctIndex: number;
    selectedIndex: number | null;
    isCorrect: boolean;
    pointsEarned: number;
    timeTaken: number;
};

const questions: Question[] = [
    {
        id: 1,
        index: 1,
        question: 'What is the capital of Nepal?',
        options: ['Kathmandu', 'Delhi', 'Dhaka', 'Nepal'],
        correctAnswer: 'Kathmandu',
        points: 10,
        time: 15, // 15 seconds
    },
    {
        id: 2,
        index: 2,
        question: 'Which planet is known as the Red Planet?',
        options: ['Earth', 'Jupiter', 'Mars', 'Venus'],
        correctAnswer: 'Mars',
        points: 10,
        time: 10, // 10 seconds
    },
    {
        id: 3,
        index: 3,
        question: 'What is the largest mammal in the world?',
        options: ['Elephant', 'Blue Whale', 'Giraffe', 'Great White Shark'],
        correctAnswer: 'Blue Whale',
        points: 10,
        time: 20, // 20 seconds
    },
    {
        id: 4,
        index: 4,
        question: 'Who wrote "To Kill a Mockingbird"?',
        options: ['Harper Lee', 'Mark Twain', 'Ernest Hemingway', 'F. Scott Fitzgerald'],
        correctAnswer: 'Harper Lee',
        points: 10,
        time: 15, // 15 seconds (fixed)
    },
    {
        id: 5,
        index: 5,
        question: 'What is the chemical symbol for gold?',
        options: ['Au', 'Ag', 'Pb', 'Fe'],
        correctAnswer: 'Au',
        points: 10,
        time: 10, // 10 seconds 
    },
];

export default function QuizScreen() {
    const router = useRouter();
    const quizId = 121;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isTimerRunning, setIsTimerRunning] = useState(true);
    const [isTimeout, setIsTimeout] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);
    const [results, setResults] = useState<ResultItem[]>([]);

    const current = questions[currentIndex];

    useEffect(() => {
        if (!current && results.length === questions.length) {
            router.replace({
                pathname: '/quiz/[id]/result',
                params: {
                    id: quizId.toString(),
                    result: JSON.stringify({
                        summary: {
                            name: 'Ujjwal',
                            image: getRandomPersonsImage(),
                            totalPoints: results.reduce((sum, q) => sum + q.pointsEarned, 0),
                            rank: 4,
                        },
                        questions: results,
                    }),
                },
            });
        }
    }, [current, results, router, quizId]);

    if (!current) return null;

    const { index, question, options, correctAnswer, points, time } = current;

    const correctIndex = options.findIndex(
        (opt) => opt.toLowerCase().trim() === correctAnswer.toLowerCase().trim()
    );

    const isOptionCorrect = (selected: number | null, correct: number) =>
        selected !== null && selected === correct;

    const finishQuestion = ({
        usedTime,
        correctIdx,
        questionData,
        selected,
    }: {
        usedTime: number;
        correctIdx: number;
        questionData: Question;
        selected: number | null;
    }) => {
        const isCorrect = isOptionCorrect(selected, correctIdx);

        console.log('Finishing question:', {
            questionId: questionData.id,
            selected,
            correctIdx,
            isCorrect,
            usedTime,
        });

        const questionResult: ResultItem = {
            id: questionData.id,
            question: questionData.question,
            options: questionData.options,
            correctIndex: correctIdx,
            selectedIndex: selected,
            isCorrect,
            pointsEarned: isCorrect ? questionData.points : 0,
            timeTaken: usedTime,
        };

        setResults((prev) => [...prev, questionResult]);

        // Move to next question and reset state
        setCurrentIndex((prev) => prev + 1);
        setSelectedIndex(null);
        setIsAnswered(false);
        setIsTimerRunning(true);
        setIsTimeout(false);
        setTimeTaken(0);
    };

    const handleSelect = (selected: number) => {
        if (isAnswered) return;

        setSelectedIndex(selected);
        setIsAnswered(true);
        setIsTimerRunning(false);
        setIsTimeout(false);

        setTimeout(
            () =>
                finishQuestion({
                    usedTime: time - timeTaken,
                    correctIdx: correctIndex,
                    questionData: current,
                    selected,
                }),
            2000
        );
    };

    const handleComplete = () => {
        if (isAnswered) return;

        setSelectedIndex(null);
        setIsAnswered(true);
        setIsTimerRunning(false);
        setIsTimeout(true);

        setTimeout(
            () =>
                finishQuestion({
                    usedTime: time,
                    correctIdx: correctIndex,
                    questionData: current,
                    selected: null,
                }),
            2000
        );
    };

    return (
        <View className="flex-1 bg-gray-50 dark:bg-black">
            {!isAnswered && <QuizHeader current={index} total={questions.length} />}

            {isTimerRunning && (
                <QuizTimer totalTime={time} onComplete={handleComplete} onTick={setTimeTaken} />
            )}

            {isAnswered && (
                <QuizFeedback
                    isCorrect={isOptionCorrect(selectedIndex, correctIndex)}
                    isTimeout={isTimeout}
                    points={points}
                />
            )}

            <QuizQuestion
                question={question}
                options={options}
                points={points}
                correctIndex={correctIndex}
                selectedIndex={selectedIndex}
                isAnswered={isAnswered}
                onSelect={handleSelect}
            />
        </View>
    );
}
