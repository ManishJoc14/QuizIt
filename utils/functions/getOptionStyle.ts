import { IconSymbolName } from "@/components/ui/IconSymbol";

// Helper function to determine the styling for each option based on correctness and selection.
export const getOptionStyle = (i: number, correctIndex: number, selectedIndex?: number | null) => {
    const isOptionCorrect = i === correctIndex;
    const isOptionSelected = i === selectedIndex;
    const isOptionSelectedFalse = isOptionSelected && !isOptionCorrect; // Selected but not correct

    let bg = 'bg-white dark:bg-gray-900';
    let text = 'text-gray-800 dark:text-gray-200';
    let icon: IconSymbolName | null = null;

    if (isOptionCorrect) {
        bg = 'bg-green-100 dark:bg-green-600 border border-green-400 dark:border-green-800';
        text = 'text-green-800 dark:text-gray-200';
        icon = 'checkmark.circle';
    }
    if (isOptionSelectedFalse) {
        bg = 'bg-red-100 dark:bg-red-600 border border-red-400 dark:border-red-800';
        text = 'text-red-800 dark:text-gray-200';
        icon = 'multiply.circle';
    }

    return { bg, text, icon };
};