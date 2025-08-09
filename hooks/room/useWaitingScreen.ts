import { useEffect } from "react";

import { useRouter } from "expo-router";

import { useGetQuizByIdQuery } from "@/services/quizApi";
import { useSocket } from "@/context/WebSocketContext";
import { useAppSelector } from "@/utils/libs/reduxHooks";
import { getToken } from "@/utils/libs/secureStorage";
import { useJoinRoomMutation } from "@/services/roomApi";
import { getRandomImage } from "@/utils/functions/getRandomImage";

export function useWaitingScreen({ id, roomCode, roomHost }: { id: number, roomCode: string, roomHost?: string }) {
    const router = useRouter();

    const { user } = useAppSelector((state) => state.auth);

    const [joinRoom] = useJoinRoomMutation();

    // Get joined users 
    const { quizStarted, joinedUsers, connected, connectToRoom } = useSocket();

    // Get quiz data
    const { data: quizData, isLoading: isQuizLoading, isError: errorInQuiz } = useGetQuizByIdQuery(Number(id), { skip: !id });

    // Connect to WebSocket
    useEffect(() => {
        const tryConnect = async () => {
            let code = roomCode;
            if (code) {
                const token = await getToken("accessToken");
                if (token) {
                    await joinRoom({ roomCode: code }).unwrap();
                    if (!connected) {
                        connectToRoom(code, token);
                    }
                }
            }
        };
        tryConnect();
    }, [roomCode, connectToRoom, connected, joinRoom]);

    // Handle quiz started
    useEffect(() => {
        // const isHost = user?.username === roomHost;
        if (!quizStarted) return;

        // console.log("--------------------------/n")
        // console.log({ quizData, isHost, id, roomCode, roomData });
        // console.log("--------------------------/n")

        // if (isHost) {
        //     // console.log("Host is starting the quiz");
        //     router.push({
        //         pathname: `/quiz/[id]/host`,
        //         params: { id: String(id), roomCode },
        //     });
        // } else {
        //     router.push({
        //         pathname: `/quiz/[id]/quiz`,
        //         params: { id: String(id), roomCode },
        //     });
        // }

        router.push({
            pathname: `/quiz/[id]/quiz`,
            params: { id: String(id), roomCode },
        });
    }, [quizStarted, router, id, roomCode, quizData, user, roomHost]);

    return {
        joinedUsers,
        quizTitle: quizData?.data?.title ?? 'Quiz Title',
        quizImage: quizData?.data?.coverPhoto ?? getRandomImage(800, 400),
        isHost: user?.username === roomHost,
        roomCode: roomCode ?? 'Loading...',
        isLoading: isQuizLoading,
        error: errorInQuiz,
        connected,
    }
}
