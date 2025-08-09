import { useState, useCallback, useEffect } from "react";

import { router } from "expo-router";

import getRandomPersonsImage from "@/utils/functions/getRandomImage";
import { QuizQuestion } from "@/types/quiz.types";
import { ResultItem } from "@/components/Library/types";
import { useAppSelector } from "@/utils/libs/reduxHooks";
import { useGetQuizQuestionsQuery } from "@/services/quizApi";
import { useSubmitAnswerMutation } from "@/services/roomApi";
import { useDecryptOptionMutation } from "@/services/featureApi";
import { useSocket } from "@/context/WebSocketContext";

interface UseQuizPlayParams {
    quizId: number;
    roomCode: string;
}

export function useQuizPlay({ quizId, roomCode }: UseQuizPlayParams) {
    const { data: questionsData, isLoading, error } = useGetQuizQuestionsQuery(quizId);
    const { leaderboard } = useSocket();
    const [submitAnswer] = useSubmitAnswerMutation();
    const [decryptOption] = useDecryptOptionMutation();

    const questions: QuizQuestion[] = questionsData?.data ?? [];
    const { user } = useAppSelector((state) => state.auth);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [decryptedCorrectIndex, setDecryptedCorrectIndex] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isTimeout, setIsTimeout] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);
    const [, setResults] = useState<ResultItem[]>([]);

    const current = questions[currentIndex];

    useEffect(() => {
        if (current) {
            async function decryptOptionFunc() {
                const res = await decryptOption({ encryptedText: String(current.correctOption) }).unwrap();
                setDecryptedCorrectIndex(res.decryptedAnswer);
            }
            decryptOptionFunc();
        }
    }, [current, decryptOption]);


    const finishQuestion = useCallback(async ({
        usedTime,
        selected,
    }: {
        usedTime: number;
        selected: number | null;
    }) => {
        if (!current) return;

        const isCorrect = selected !== null && selected === decryptedCorrectIndex;

        // Submit answer to backend
        const payload = {
            questionIndex: current.questionIndex,
            selectedOption: selected,
            point: isCorrect ? current.points : 0,
            answeredAt: new Date().toISOString(),
        };

        const submitPayload = {
            roomCode,
            data: payload,
        };

        try {
            await submitAnswer(submitPayload);
        } catch (e) {
            console.error("Submit answer failed", JSON.stringify(e));
        }

        const questionResult: ResultItem = {
            id: current.questionId,
            question: current.question,
            options: current.options,
            correctIndex: decryptedCorrectIndex ?? -1,
            selectedIndex: selected,
            isCorrect,
            timeTaken: usedTime,
            points: isCorrect ? current.points : 0,
        };

        setResults((prevResults) => {
            const newResults = [...prevResults, questionResult];
            // On quiz completion
            if (currentIndex + 1 >= questions.length) {
                router.replace({
                    pathname: '/quiz/[id]/scoreboard',
                    params: {
                        id: quizId.toString(),
                        result: JSON.stringify({
                            summary: {
                                name: user?.fullName,
                                image: user?.photo || user?.image || getRandomPersonsImage(),
                                totalPoints: newResults.reduce((sum, q) => sum + q.points, 0),
                                rank: 4,
                            },
                            questions: newResults,
                        }),
                    },
                });
            } else {
                setCurrentIndex((prev) => prev + 1);
            }
            return newResults;
        });

        setSelectedIndex(null);
        setIsAnswered(false);
        setIsTimeout(false);
        setTimeTaken(0);
    }, [
        current,
        currentIndex,
        questions.length,
        user,
        quizId,
        submitAnswer,
        roomCode,
        decryptedCorrectIndex,
    ]);


    const handleSelect = useCallback(
        (selected: number) => {
            if (isAnswered) return;
            setSelectedIndex(selected);
            setIsAnswered(true);
            setIsTimeout(false);
            setTimeout(() => {
                finishQuestion({ usedTime: timeTaken, selected });
            }, 500);
        },
        [finishQuestion, isAnswered, timeTaken]
    );

    const handleTimeout = useCallback(() => {
        if (isAnswered) return;
        setSelectedIndex(null);
        setIsAnswered(true);
        setIsTimeout(true);
        setTimeout(() => {
            finishQuestion({ usedTime: current?.duration ?? 0, selected: null })
        }, 500);
    }, [finishQuestion, isAnswered, current]);

    return {
        currentQuestion: current,
        currentIndex,
        totalQuestions: questions.length,
        selectedIndex,
        correctIndex: decryptedCorrectIndex,
        isAnswered,
        isTimeout,
        timeTaken,
        setTimeTaken,
        handleSelect,
        handleTimeout,
        isLoading,
        error,
        leaderboard,
    };
}
