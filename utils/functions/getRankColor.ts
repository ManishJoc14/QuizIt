
// Helper function to get rank color based on the rank number
export const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500 border-yellow-600';
    if (rank === 2) return 'bg-gray-400 border-gray-500';
    if (rank === 3) return 'bg-stone-500 border-stone-600';
    return 'bg-violet-400 border-violet-500'; // Default for other ranks
};

// Helper to get rank-specific border color for the image
export const getImageBorderColor = (rank: number) => {
    if (rank === 1) return 'border-yellow-500';
    if (rank === 2) return 'border-gray-400';
    if (rank === 3) return 'border-stone-500';
    return 'border-blue-500'; // Default for other ranks
};