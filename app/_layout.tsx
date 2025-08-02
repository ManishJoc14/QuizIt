import React, { useEffect, useState } from 'react';

import { SafeAreaView } from 'react-native';

import { Stack } from 'expo-router';

import Toast from 'react-native-toast-message';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import "../global.css";
// import '@/utils/libs/appearance.web';


import { store } from '@/utils/libs/store';
import { toastConfig } from '@/utils/functions/toastConfig';
import { useTheme, ThemeProviderWrapper } from '@/context/ThemeContext';

function InnerRootLayout() {
  const { theme, loading } = useTheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    if (fontsLoaded && theme !== null && !loading) {
      setIsAppReady(true);
    }
  }, [fontsLoaded, theme, loading]);


  if (!isAppReady) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* Theme toggle button */}
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(home)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="quiz" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <Toast config={toastConfig} visibilityTime={6000} />
        <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      </ThemeProvider>
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeProviderWrapper>
        <InnerRootLayout />
      </ThemeProviderWrapper>
    </Provider>
  );
}
