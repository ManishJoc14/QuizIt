import { useRouter } from 'expo-router';

import { useDispatch } from 'react-redux';

import { deleteToken } from '@/utils/libs/secureStorage';
import { logout } from '@/features/auth/authSlice';

export function useLogout() {
    const dispatch = useDispatch();
    const router = useRouter();

    return async () => {
        dispatch(logout());
        await deleteToken('accessToken');
        await deleteToken('refreshToken');
        router.replace('/(auth)/signin');
    };
}
