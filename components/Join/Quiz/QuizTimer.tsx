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

  const labelLeftInterpolate = progressAnim.interpolate({
    inputRange: [0, totalTime],
    outputRange: ['-8%', '90%'],
    extrapolate: 'clamp',
  });

  const getColorClass = (t: number) => {
    if (t <= 6) return { bg: 'bg-red-200', fg: 'bg-red-500', text: 'text-red-100' };
    if (t <= 12) return { bg: 'bg-yellow-200', fg: 'bg-yellow-500', text: 'text-yellow-100' };
    return { bg: 'bg-violet-200', fg: 'bg-violet-500', text: 'text-violet-100' };
  };

  const { bg, fg, text } = getColorClass(timeLeft);

  return (
    <View className="mx-6 my-4">
      <View className={`h-6 w-full rounded-full overflow-hidden relative ${bg}`}>
        <Animated.View
          className={`absolute top-0 left-0 h-6 rounded-full ${fg}`}
          style={{ width: widthInterpolate }}
        />
        <Animated.Text
          className={`absolute text-sm font-semibold ${text}`}
          style={{
            top: '50%',
            transform: [{ translateY: -10 }],
            left: labelLeftInterpolate,
          }}
        >
          {timeLeft}s
        </Animated.Text>
      </View>
    </View>
  );
}
