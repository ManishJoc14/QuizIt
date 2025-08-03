import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const isWeb = Platform.OS === 'web';

export const Storage = {
    async getItem(key: string): Promise<string | null> {
        if (isWeb) {
            return Promise.resolve(localStorage.getItem(key));
        } else {
            return await SecureStore.getItemAsync(key);
        }
    },

    async setItem(key: string, value: string): Promise<void> {
        if (isWeb) {
            localStorage.setItem(key, value);
            return Promise.resolve();
        } else {
            return await SecureStore.setItemAsync(key, value);
        }
    },

    async deleteItem(key: string): Promise<void> {
        if (isWeb) {
            localStorage.removeItem(key);
            return Promise.resolve();
        } else {
            return await SecureStore.deleteItemAsync(key);
        }
    },
};
