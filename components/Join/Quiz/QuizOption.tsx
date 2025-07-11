import { Text, Pressable } from 'react-native';
import { IconSymbol, IconSymbolName } from '@/components/ui/IconSymbol';
import { useTheme } from '@/context/ThemeContext';

type OptionProps = {
    index: number;
    label: string;
    isSelected: boolean;
    isAnswered: boolean;
    isCorrect?: boolean;
    onSelect: () => void;
};

export function QuizOption({
    index,
    label,
    isSelected,
    isCorrect,
    isAnswered,
    onSelect,
}: OptionProps) {
    const getOptionStyle = () => {
        if (!isAnswered) return 'border border-gray-300';
        if (isCorrect) return 'bg-green-100 dark:bg-green-600 border border-green-400 dark:border-green-800';
        if (isSelected && !isCorrect)
            return 'bg-red-100 dark:bg-red-600 border border-red-400 dark:border-red-800';
        return 'border border-gray-200';
    };

    const { theme } = useTheme();

    const getIconProps = () => {
        if (!isAnswered) return null;

        if (isCorrect) {
            return { name: 'checkmark.circle', color: theme === 'dark' ? '#4ade80' : '#16a34a' }; // green
        }

        if (isSelected && !isCorrect) {
            return { name: 'multiply.circle', color: theme === 'dark' ? '#f87171' : '#dc2626' }; // red
        }

        return null;
    };

    const icon = getIconProps();

    return (
        <Pressable
            onPress={onSelect}
            disabled={isAnswered}
            className={`flex-row items-center justify-between rounded-xl px-4 py-4 mb-4 ${getOptionStyle()}`}
        >
            <Text className="text-gray-800 dark:text-gray-200 text-lg font-medium">{`${index + 1}. ${label}`}</Text>

            {icon && <IconSymbol size={24} name={icon.name as IconSymbolName} color={icon.color} />}
        </Pressable>
    );
}
