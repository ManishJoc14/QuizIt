import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { QuizFeedback } from "@/components/Join/Quiz/QuizFeedback";
import { QuizHeader } from "@/components/Join/Quiz/QuizHeader";
import { QuizQuestion } from "@/components/Join/Quiz/QuizQuestion";
import { QuizTimer } from "@/components/Join/Quiz/QuizTimer";
import { useQuizPlay } from "@/hooks/room/useQuizPlay";
import { LeaderboardStrip } from "@/components/leadeBoard";

export default function QuizScreen() {
    const { id: quizId, roomCode } = useLocalSearchParams<{
        id: string;
        roomCode: string;
    }>();

    const code = Array.isArray(roomCode) ? roomCode[0] : roomCode;

    const {
        currentQuestion,
        currentIndex,
        totalQuestions,
        selectedIndex,
        correctIndex,
        isAnswered,
        isTimeout,
        setTimeTaken,
        handleSelect,
        handleTimeout,
        isLoading,
        error,
        leaderboard,
    } = useQuizPlay({
        quizId: Number(quizId),
        roomCode: code,
    });

    if (isLoading || !currentQuestion) return null;
    if (error)
        return (
            <View>
                <Text>Error loading quiz.</Text>
            </View>
        );

    const { question, options, points, duration } = currentQuestion;

    const isOptionCorrect = (selected: number | null, correct: number) =>
        selected !== null && selected === correct;

    return (
        <View className="flex-1 bg-gray-50 dark:bg-black">
            {!isAnswered && (
                <QuizHeader current={currentIndex + 1} total={totalQuestions} />
            )}

            {!isAnswered && (
                <QuizTimer
                    totalTime={duration}
                    onComplete={handleTimeout}
                    onTick={setTimeTaken}
                />
            )}
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

                {isAnswered && (
                    <QuizFeedback
                        isCorrect={isOptionCorrect(selectedIndex, correctIndex ?? -1)}
                        isTimeout={isTimeout}
                        points={points}
                    />
                )}

                <View className="flex-1 flex-row h-full justify-between gap-2 items-start">
                    <QuizQuestion
                        question={question}
                        options={options}
                        points={points}
                        correctIndex={correctIndex ?? -1}
                        selectedIndex={selectedIndex}
                        isAnswered={isAnswered}
                        onSelect={handleSelect}
                    />
                    {/* Leaderboard above questions */}
                    <LeaderboardStrip leaderboard={leaderboard} />
                </View>
            </ScrollView>
        </View>
    );
}
