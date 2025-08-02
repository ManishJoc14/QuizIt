import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useRef,
    ReactNode,
    useCallback,
} from "react";

interface LeaderboardEntry {
    id: number;
    name: string;
    image: string;
    rank: number;
    totalPoints: number;
}

interface SocketContextType {
    connected: boolean;
    quizStarted: boolean;
    joinedUsers: string[];
    leaderboard: LeaderboardEntry[]
    messages: string[];
    sendMessage: (msg: string) => void;
    connectToRoom: (roomCode: string, token: string) => void;
    disconnect: () => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
};

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const [connected, setConnected] = useState(false);
    const [quizStarted, setQuizStarted] = useState(false);
    const [joinedUsers, setJoinedUsers] = useState<string[]>([]);
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [messages, setMessages] = useState<string[]>([]);
    const ws = useRef<WebSocket | null>(null);

    // Connect to websocket with roomCode and token
    const connectToRoom = useCallback((roomCode: string, token: string) => {
        if (ws.current) {
            ws.current.close();
        }

        const protocol = window.location.protocol === "https:" ? "wss" : "ws";
        const wsUrl = `${protocol}://192.168.1.65:8000/room/${roomCode}?token=${token}`;
        ws.current = new WebSocket(wsUrl);

        ws.current.onopen = () => {
            setConnected(true);
            console.log("WebSocket connected");
        };

        ws.current.onmessage = (event) => {
            console.log(event.data, 'WebSocket message received');
            try {
                const res = JSON.parse(event.data);
                if (res.type === "quiz_started") {
                    setQuizStarted(true);
                }
                if (res.type === "user_list") {
                    setJoinedUsers(res.data || []);
                }
                if (res.type === "leaderboard") {
                    setLeaderboard(res.data || []);
                }
                if (res.type === 'chat') {
                    setMessages((prev) => [...prev, event.data]);
                }
            } catch {
                setMessages((prev) => [...prev, event.data]);
            }
        };

        ws.current.onclose = () => {
            setConnected(false);
            console.log("WebSocket disconnected");
        };

        ws.current.onerror = (error) => {
            console.error("WebSocket error:", error);
            ws.current?.close();
        };
    }, [setConnected, setQuizStarted, setJoinedUsers, setMessages]);

    // Send message to backend
    const sendMessage = (msg: string) => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            console.log("Sending message:", msg);
            ws.current.send(msg);
        } else {
            console.warn("WebSocket is not connected");
        }
    };

    // Disconnect socket
    const disconnect = useCallback(() => {
        if (ws.current) {
            ws.current.close();
            ws.current = null;
            setConnected(false);
            setQuizStarted(false);
            setJoinedUsers([]);
            setLeaderboard([]);
            setMessages([]);
            console.log("WebSocket disconnected");
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            disconnect();
        };
    }, [disconnect]);

    return (
        <SocketContext.Provider
            value={{ connected, quizStarted, joinedUsers, leaderboard, messages, sendMessage, connectToRoom, disconnect }}
        >
            {children}
        </SocketContext.Provider>
    );
};
