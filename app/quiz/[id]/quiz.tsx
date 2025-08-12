import React from "react";
import { View, Text, ScrollView, useWindowDimensions } from "react-native";
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

    const { width } = useWindowDimensions();
    const isLargeScreen = width >= 768;
    const LEADERBOARD_HEIGHT = 130; // adjust if you want a different mobile bar height

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
    if (error) return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Error loading quiz.</Text>
        </View>
    );

    const { question, options, points, duration } = currentQuestion;
    const isOptionCorrect = (selected: number | null, correct: number) =>
        selected !== null && selected === correct;

    return (
        <View
            style={{
                flex: 1,
                flexDirection: isLargeScreen ? "row" : "column",
                position: "relative",
            }}
        >
            {/* Main quiz column */}
            <View style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{
                        padding: 16,
                        paddingTop: 0,
                        paddingBottom: isLargeScreen ? 24 : LEADERBOARD_HEIGHT + 16, 
                    }}
                    showsVerticalScrollIndicator={false}
                >
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

            {isAnswered && (
                <QuizFeedback
                    isCorrect={isOptionCorrect(selectedIndex, correctIndex ?? -1)}
                    isTimeout={isTimeout}
                    points={points}
                />
            )}
                    <QuizQuestion
                        question={question}
                        options={options}
                        points={points}
                        correctIndex={correctIndex ?? -1}
                        selectedIndex={selectedIndex}
                        isAnswered={isAnswered}
                        onSelect={handleSelect}
                    />
                </ScrollView>
            </View>

            {/* LARGE SCREEN: right sidebar */}
            {isLargeScreen && (
                <View
                    style={{
                        width: 220,
                        paddingLeft: 16,
                    }}
                >
                    <LeaderboardStrip leaderboard={leaderboard} layout="vertical" />
                </View>
            )}

            {/* MOBILE: fixed bottom compact leaderboard */}
            {!isLargeScreen && (
                <View
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 50,
                        height: LEADERBOARD_HEIGHT,                    }}
                >
                    <LeaderboardStrip leaderboard={leaderboard} layout="compact" />
                </View>
            )}
        </View>
    );
}
