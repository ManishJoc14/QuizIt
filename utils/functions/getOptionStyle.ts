import { IconSymbolName } from "@/components/ui/IconSymbol";

// Helper function to determine the styling for each option based on correctness and selection.
export const getOptionStyle = (i: number, correctIndex: number, selectedIndex?: number | null) => {
    const isOptionCorrect = i === correctIndex;
    const isOptionSelected = i === selectedIndex;
    const isOptionSelectedFalse = isOptionSelected && !isOptionCorrect; // Selected but not correct

    let bg = 'bg-white';
    let text = 'text-gray-800';
    let icon: IconSymbolName | null = null;

    if (isOptionCorrect) {
        bg = 'bg-green-200';
        text = 'text-green-800';
        icon = 'checkmark.circle';
    }
    if (isOptionSelectedFalse) {
        bg = 'bg-red-200';
        text = 'text-red-800';
        icon = 'multiply.circle';
    }

    return { bg, text, icon };
};