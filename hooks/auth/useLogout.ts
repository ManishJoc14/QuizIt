import { useRouter } from 'expo-router';

import { useDispatch } from 'react-redux';

import { deleteToken } from '@/utils/libs/secureStorage';
import { logout } from '@/features/auth/authSlice';
import Toast from 'react-native-toast-message';

export function useLogout() {
    const dispatch = useDispatch();
    const router = useRouter();

    return async () => {
        dispatch(logout());
        await deleteToken('accessToken');
        await deleteToken('refreshToken');
        router.replace('/(auth)/signin');
        // console.log('Logged out successfully');
        Toast.show({
            type: 'success',
            text1: 'Logout successful',
            text2: 'You have been logged out.',
        });
    };
}
