import { useEffect } from "react";

import { getToken } from "@/utils/libs/secureStorage";
import { useSocket } from "@/context/WebSocketContext";
import { useGetRoomCodeQuery, useJoinRoomMutation } from "@/services/roomApi";

export function useInviteScreen(id: number) {
    const { connectToRoom, connected, joinedUsers } = useSocket();
    const [joinRoom] = useJoinRoomMutation();

    // Get room code
    const {
        data: roomData,
        isLoading,
        isError,
    } = useGetRoomCodeQuery({ quizId: String(id) }, { skip: !id });


    // Connect to WebSocket
    useEffect(() => {
        const tryConnect = async () => {
            let code = roomData?.roomCode;
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
    }, [roomData?.roomCode, connectToRoom, connected, joinRoom]);

    return {
        roomCode: roomData?.roomCode ?? 'Loading...',
        isLoading,
        error: isError,
        roomHost: roomData?.roomHost ?? 'Loading...',
        joinedUsers,
    };
}