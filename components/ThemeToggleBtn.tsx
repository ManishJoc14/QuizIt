import React from 'react';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/context/ThemeContext';
import { IconSymbol } from './ui/IconSymbol';

export default function ThemeToggleBtn() {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            onPress={toggleTheme}
            variant="outline"
            color="gray"
            className='w-10 h-10'
            
            radius="full"
        >{theme === 'dark' ?
            <IconSymbol size={24} name="sun.max" color="grey" />
            : <IconSymbol size={24} name="moon" color="grey" />}
        </Button>
    );
}
