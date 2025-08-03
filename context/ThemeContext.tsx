import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance, Platform } from 'react-native';
import { colorScheme as nativeColorScheme } from 'nativewind';
import { Storage } from '@/utils/libs/storage'; //

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
  Appearance.setColorScheme = (scheme: 'light' | 'dark' | null | undefined) => {
    const theme = scheme === 'dark' || scheme === 'light' ? scheme : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  };

  Appearance.getColorScheme = (): ThemeType => {
    const userValue = document.documentElement.getAttribute('data-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const systemValue: ThemeType = systemPrefersDark ? 'dark' : 'light';
    return userValue && userValue !== 'null' ? (userValue as ThemeType) : systemValue;
  };

  Appearance.addChangeListener = (listener: (event: { colorScheme: ThemeType }) => void) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      // no-op if environment isn't ready
      return { remove: () => { } };
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const systemListener = (e: MediaQueryListEvent) => {
      const systemValue: ThemeType = e.matches ? 'dark' : 'light';
      const userValue = document.documentElement.getAttribute('data-theme');
      listener({
        colorScheme: userValue && userValue !== 'null' ? (userValue as ThemeType) : systemValue,
      });
    };

    mediaQuery.addEventListener('change', systemListener);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const scheme = Appearance.getColorScheme();
          listener({ colorScheme: scheme === 'dark' || scheme === 'light' ? scheme : 'light' });
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
    let isMounted = true;
    const loadTheme = async () => {
      try {
        const saved = await Storage.getItem(STORAGE_KEY);
        // console.log('Loaded saved theme:', saved);
        const system = Appearance.getColorScheme() || 'light';
        const toUse = saved === 'dark' || saved === 'light' ? saved : system;

        if (!isMounted) return;
        setTheme(toUse);
        setColorScheme(toUse);
      } catch (err) {
        console.error('Theme load failed:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadTheme();
  }, []);

  const setColorScheme = (mode: ThemeType) => {
    if (Platform.OS === 'web') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(mode);
      document.documentElement.style.colorScheme = mode;
      Appearance.setColorScheme(mode);
    } else {
      nativeColorScheme.set(mode);
    }
  };

  const toggleTheme = async () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    try {
      await Storage.setItem(STORAGE_KEY, next);
      setColorScheme(next);
    } catch (err) {
      console.error('Error setting theme:', err);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, loading, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
