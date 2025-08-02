import React from 'react';
import { Platform } from 'react-native';
import { BaseToast, ErrorToast } from 'react-native-toast-message';
import type { BaseToastProps } from 'react-native-toast-message';

const shadowStyle = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  android: {
    elevation: 6,
  },
  web: {
    boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
  },
});

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#10b981',
        backgroundColor: '#f0fdfa',
        borderRadius: 14,
        paddingVertical: 14,
        marginHorizontal: 12,
        marginTop: 8,
        marginBottom: 2,
        ...shadowStyle,
      }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      text1Style={{
        fontSize: 17,
        fontWeight: '700',
        color: '#064e3b',
      }}
      text2Style={{
        fontSize: 15,
        color: '#047857',
        marginTop: 2,
      }}
    />
  ),

  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: '#dc2626',
        backgroundColor: '#fef2f2',
        borderRadius: 14,
        paddingVertical: 14,
        marginHorizontal: 12,
        marginTop: 8,
        marginBottom: 2,
        ...shadowStyle,
      }}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      text1Style={{
        fontSize: 17,
        fontWeight: '700',
        color: '#7f1d1d',
      }}
      text2Style={{
        fontSize: 15,
        color: '#991b1b',
        marginTop: 2,
      }}
    />
  ),
};
