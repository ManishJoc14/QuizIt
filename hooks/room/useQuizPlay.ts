import { useState, useCallback } from "react";

import { router } from "expo-router";

import getRandomPersonsImage from "@/utils/functions/getRandomImage";
import { QuizQuestion } from "@/types/quiz.types";
import { ResultItem } from "@/components/Library/types";
import { useAppSelector } from "@/utils/libs/reduxHooks";
import { useGetQuizQuestionsQuery } from "@/services/quizApi";
import { useSubmitAnswerMutation } from "@/services/roomApi";

interface UseQuizPlayParams {
    quizId: number;
    roomCode: string;
}

export function useQuizPlay({ quizId, roomCode }: UseQuizPlayParams) {
    const { data: questionsData, isLoading, error } = useGetQuizQuestionsQuery(quizId);
    // const { sendMessage } = useSocket();
    const [submitAnswer] = useSubmitAnswerMutation();
    const questions: QuizQuestion[] = questionsData?.data ?? [];
    const { user } = useAppSelector((state) => state.auth);

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isTimeout, setIsTimeout] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0);
    const [results, setResults] = useState<ResultItem[]>([]);

    const current = questions[currentIndex];

    const finishQuestion = useCallback(async ({
        usedTime,
        selected,
    }: {
        usedTime: number;
        selected: number | null;
    }) => {
        if (!current) return;

        const correctIndex = current.correctOption

        const isCorrect = selected !== null && selected === correctIndex;

        // Submit answer to backend
        const payload = {
            questionIndex: current.questionIndex,
            selectedOption: String(selected),
            point: isCorrect ? current.points : 0,
            answeredAt: new Date().toISOString()
        };

        const submitPayload = {
            roomCode,
            data: payload
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
            correctIndex,
            selectedIndex: selected,
            isCorrect,
            timeTaken: usedTime,
            points: isCorrect ? current.points : 0,
        };

        setResults((prev) => [...prev, questionResult]);
        setSelectedIndex(null);
        setIsAnswered(false);
        setIsTimeout(false);
        setTimeTaken(0);

        // on quiz completion
        if (currentIndex + 1 >= questions.length) {
            const resultData = [...results, questionResult];
            router.replace({
                pathname: '/quiz/[id]/scoreboard',
                params: {
                    id: quizId.toString(),
                    result: JSON.stringify({
                        summary: {
                            name: user?.fullName,
                            image: user?.photo || getRandomPersonsImage(),
                            totalPoints: resultData.reduce((sum, q) => sum + q.points, 0),
                            rank: 4,
                        },
                        questions: resultData,
                    }),
                },
            });
        } else {
            setCurrentIndex((prev) => prev + 1);
        }
    },
        [current, currentIndex, questions.length, user, quizId, results, submitAnswer, roomCode]
    );

    const handleSelect = useCallback(
        (selected: number) => {
            if (isAnswered) return;
            setSelectedIndex(selected);
            setIsAnswered(true);
            setIsTimeout(false);
            setTimeout(() => {
                finishQuestion({ usedTime: timeTaken, selected });
            }, 1000);
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
        }, 1000);
    }, [finishQuestion, isAnswered, current]);

    return {
        currentQuestion: current,
        currentIndex,
        totalQuestions: questions.length,
        selectedIndex,
        isAnswered,
        isTimeout,
        timeTaken,
        setTimeTaken,
        handleSelect,
        handleTimeout,
        isLoading,
        error,
    };
}
