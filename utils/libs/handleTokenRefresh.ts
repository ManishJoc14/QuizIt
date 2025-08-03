import axios from 'axios';
import { saveToken, deleteToken, getToken } from './secureStorage';
import { router } from 'expo-router';

export async function handleTokenRefresh(baseUrl: string) {
    const refreshToken = await getToken('refreshToken');
    // console.log('Refreshing token with refreshToken:', refreshToken);

    if (!refreshToken) {
        router.push('/signin');
        return null;
    };

    try {
        const refreshResponse = await axios.post(baseUrl + `/auth/renew-access?refresh_token=${refreshToken}`);

        const { access_token } = refreshResponse.data;

        await saveToken('accessToken', access_token);
        await saveToken('refreshToken', refreshToken);

        return { accessToken: access_token };
    } catch {
        await deleteToken('accessToken');
        await deleteToken('refreshToken');
        return null;
    }
}
