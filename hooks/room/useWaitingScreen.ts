import { useEffect } from "react";

import { useRouter } from "expo-router";

import { useGetQuizByIdQuery } from "@/services/quizApi";
import { useGetRoomCodeQuery } from "@/services/roomApi";
import { useSocket } from "@/context/WebSocketContext";
import { getToken } from "@/utils/libs/secureStorage";

export function useWaitingScreen(id: number, roomCodeParam?: string) {
    const router = useRouter();

    // Get joined users 
    const { quizStarted, joinedUsers, connected, connectToRoom } = useSocket();

    // Get quiz data
    const { data: quizData, isLoading: isQuizLoading, isError: errorInQuiz } = useGetQuizByIdQuery(Number(id), { skip: !id });

    // Get room code
    const {
        data: roomCodeData,
        isLoading: roomCodeLoadingFromApi,
        isError: roomCodeErrorFromApi,
    } = useGetRoomCodeQuery({ quizId: String(id) }, { skip: !id || !!roomCodeParam });

    // Local variables to allow reassignment
    let isRoomCodeLoading = roomCodeLoadingFromApi;
    let errorInRoomCode = roomCodeErrorFromApi;

    // Connect to WebSocket
    useEffect(() => {
        const tryConnect = async () => {
            let code = roomCodeParam ?? roomCodeData?.roomCode;
            if (code) {
                const token = await getToken("accessToken");
                if (token) {
                    connectToRoom(code, token);
                }
            }
        };

        tryConnect();
    }, [roomCodeData, roomCodeParam, connectToRoom]);

    // Handle quiz started
    useEffect(() => {
        const isHost = quizData?.data.isThisMe ?? false;
        const code = roomCodeParam ? roomCodeParam : roomCodeData?.roomCode
        if (!quizStarted) return;

        console.log("--------------------------/n")
        console.log({ quizData, isHost, id, roomCodeParam, roomCodeData });
        console.log("--------------------------/n")

        if (isHost) {
            console.log("Host is starting the quiz");
            router.push({
                pathname: `/quiz/[id]/host`,
                params: { id: String(id), roomCode: code },
            });
        } else {
            router.push({
                pathname: `/quiz/[id]/quiz`,
                params: { id: String(id), roomCode: code },
            });
        }
    }, [quizStarted, router, id, roomCodeData, roomCodeParam, quizData]);

    if (roomCodeParam) {
        isRoomCodeLoading = false;
        errorInRoomCode = false;
    }

    return {
        joinedUsers,
        quizTitle: quizData?.data?.title ?? 'Quiz Title',
        isHost: quizData?.data?.isThisMe ?? false,
        roomCode: roomCodeParam ?? roomCodeData?.roomCode ?? 'Loading...',
        isLoading: isQuizLoading || isRoomCodeLoading,
        error: errorInQuiz || errorInRoomCode,
        connected,
    }
}
