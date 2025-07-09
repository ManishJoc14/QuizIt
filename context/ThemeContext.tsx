import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colorScheme } from "nativewind";

const STORAGE_KEY = 'color-scheme';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
    theme: ThemeType;
    loading: boolean;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    loading: true,
    toggleTheme: () => { },
});

export const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<ThemeType>('light');
    const [loading, setLoading] = useState(true);

    // Load saved theme on mount
    useEffect(() => {
        AsyncStorage.getItem(STORAGE_KEY)
            .then(saved => {
                const system = Appearance.getColorScheme() || 'light';
                const themeToUse = saved === 'light' || saved === 'dark' ? saved : system;
                setTheme(themeToUse);
                colorScheme.set(themeToUse);
                updateHtmlClass(themeToUse);
            })
            .finally(() => setLoading(false));
    }, []);

    const updateHtmlClass = (mode: ThemeType) => {
        if (Platform.OS === 'web') {
            document.documentElement.classList.toggle('dark', mode === 'dark');
            document.documentElement.classList.toggle('light', mode === 'light');
        }
    };

    const toggleTheme = () => {
        const next = theme === 'dark' ? 'light' : 'dark';
        setTheme(next);
        colorScheme.set(next);
        updateHtmlClass(theme);
        AsyncStorage.setItem(STORAGE_KEY, next);
    };

    return (
        <ThemeContext.Provider value={{ theme, loading, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export function useTheme() {
    return useContext(ThemeContext);
}
