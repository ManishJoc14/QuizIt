import axios from 'axios';
import { saveToken, deleteToken, getToken } from './secureStorage';

export async function handleTokenRefresh(baseUrl: string) {
    const refreshToken = await getToken('refreshToken');

    if (!refreshToken) return null;

    try {
        const refreshResponse = await axios.post(baseUrl + '/refresh-token', { refreshToken });

        const { accessToken: newAccess, refreshToken: newRefresh } = refreshResponse.data;

        await saveToken('accessToken', newAccess);
        await saveToken('refreshToken', newRefresh);

        return { accessToken: newAccess };
    } catch {
        await deleteToken('accessToken');
        await deleteToken('refreshToken');
        return null;
    }
}
