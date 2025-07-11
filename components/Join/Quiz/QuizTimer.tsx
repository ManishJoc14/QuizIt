import { useEffect, useRef, useState } from 'react';
import { View, Animated } from 'react-native';

export function QuizTimer({
    totalTime = 30,
    onComplete,
    onTick,
}: {
    totalTime: number;
    onComplete?: () => void;
    onTick?: (timeLeft: number) => void;
}) {
    const [timeLeft, setTimeLeft] = useState(totalTime);
    const progressAnim = useRef(new Animated.Value(totalTime)).current;

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                const next = prev - 1;

                if (next <= 0) {
                    clearInterval(interval);
                    onComplete?.();
                    return 0;
                }

                return next;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [totalTime, onComplete]);

    useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: timeLeft,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    }, [timeLeft, progressAnim]);

    useEffect(() => {
        onTick?.(timeLeft);
    }, [timeLeft, onTick]);

    const widthInterpolate = progressAnim.interpolate({
        inputRange: [0, totalTime],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp',
    });

    return (
        <View className="mx-6 my-4">
            <View className="h-6 w-full rounded-full bg-violet-200 overflow-hidden relative">
                <Animated.View
                    className="absolute top-0 left-0 h-6 bg-violet-500 rounded-full"
                    style={{ width: widthInterpolate }}
                />
                <Animated.Text
                    className="absolute text-base font-semibold text-white dark:text-white"
                    style={{
                        top: '50%',
                        transform: [{ translateY: -10 }],
                        left: progressAnim.interpolate({
                            inputRange: [0, totalTime],
                            outputRange: ['-8%', '90%'],
                            extrapolate: 'clamp',
                        }),
                    }}
                >
                    {timeLeft}s
                </Animated.Text>
            </View>
        </View>
    );
}
