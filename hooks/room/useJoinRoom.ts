import { useState } from "react";

import { useRouter } from "expo-router";

import { useJoinRoomMutation } from "@/services/roomApi";

export function useJoinRoom() {
    const [code, setCode] = useState('');
    const router = useRouter();
    const [joinRoom] = useJoinRoomMutation();

    const handleJoin = async () => {
        let trimmedCode = code.trim();

        if (!trimmedCode) {
            console.warn('Room code cannot be empty');
            return;
        }

        try {
            const data = await joinRoom({ roomCode: trimmedCode }).unwrap();
            router.replace({
                pathname: '/quiz/[id]/waiting',
                params: {
                    id: data.quizId.toString(),
                    roomCode: trimmedCode,
                },
            });
        } catch (error) {
            console.error('Error joining room:', error);
        }
    };

    return {
        code,
        setCode,
        handleJoin,
    };
}