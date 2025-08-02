import { Storage } from './storage';

export const saveToken = async (key: string, value: string) => {
    await Storage.setItem(key, value);
};

export const getToken = async (key: string) => {
    return await Storage.getItem(key);
};

export const deleteToken = async (key: string) => {
    await Storage.deleteItem(key);
};
