import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colorScheme as nativeColorScheme } from 'nativewind';

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

// --- Polyfill Appearance for Web ---
if (Platform.OS === 'web' && typeof window !== 'undefined' && typeof document !== 'undefined') {
  // Polyfill setColorScheme
  Appearance.setColorScheme = (scheme: 'light' | 'dark' | null | undefined) => {
    const theme = scheme === 'dark' || scheme === 'light' ? scheme : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  };

  // Polyfill getColorScheme
  Appearance.getColorScheme = (): ThemeType => {
    const userValue = document.documentElement.getAttribute('data-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemValue: ThemeType = systemPrefersDark ? 'dark' : 'light';
    return userValue && userValue !== 'null' ? (userValue as ThemeType) : systemValue;
  };

  // Polyfill addChangeListener
  Appearance.addChangeListener = (listener: (event: { colorScheme: ThemeType }) => void) => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Listen for system preference changes
    const systemListener = (e: MediaQueryListEvent) => {
      const newSystemValue: ThemeType = e.matches ? 'dark' : 'light';
      const userValue = document.documentElement.getAttribute('data-theme');
      listener({
        colorScheme: userValue && userValue !== 'null' ? (userValue as ThemeType) : newSystemValue,
      });
    };
    mediaQuery.addEventListener('change', systemListener);

    // Listen for user overrides (mutation observer)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const scheme = Appearance.getColorScheme();
          listener({ colorScheme: scheme === 'dark' ? 'dark' : 'light' });
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });

    return {
      remove: () => {
        mediaQuery.removeEventListener('change', systemListener);
        observer.disconnect();
      },
    };
  };
}
// --- End Polyfill ---

export const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>('light');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTheme = async () => {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      const system = Appearance.getColorScheme() || 'light';
      const toUse = saved === 'dark' || saved === 'light' ? saved : system;

      setTheme(toUse);
      setColorScheme(toUse);
      setLoading(false);
    };

    loadTheme();

    // Listen to system or data-theme changes dynamically
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      // Only update theme if user has not saved a preference (saved === null)
      AsyncStorage.getItem(STORAGE_KEY).then(saved => {
        if (!saved) {
          if (colorScheme === 'dark' || colorScheme === 'light') {
            setTheme(colorScheme);
            setColorScheme(colorScheme);
          }
        }
      });
    });

    return () => subscription?.remove && subscription.remove();
  }, []);

  const setColorScheme = (mode: ThemeType) => {
    if (Platform.OS === 'web') {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(mode);
        document.documentElement.style.colorScheme = mode;
        Appearance.setColorScheme(mode); // triggers the polyfill data-theme attribute
      }
    } else {
      nativeColorScheme.set(mode);
    }
  };

  const toggleTheme = async () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    await AsyncStorage.setItem(STORAGE_KEY, next);
    setColorScheme(next);
  };

  return (
    <ThemeContext.Provider value={{ theme, loading, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
