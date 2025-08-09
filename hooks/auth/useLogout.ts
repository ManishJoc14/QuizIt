import { useRouter } from 'expo-router';

import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

import { deleteToken, getToken } from '@/utils/libs/secureStorage';
import { logout } from '@/features/auth/authSlice';
import { useLazyLogoutGoogleSigninQuery } from '@/services/authApi';

export function useLogout() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [logoutGoogleSignin] = useLazyLogoutGoogleSigninQuery();

    return async () => {
        try {
            dispatch(logout());
            await deleteToken('accessToken');
            await deleteToken('refreshToken');

            const isGoogleSignIn = await getToken('isGoogleSignIn');
            if (isGoogleSignIn === 'true') {
                await logoutGoogleSignin().unwrap();
                await deleteToken('isGoogleSignIn');
            }
            router.replace('/(auth)/signin');
        } catch (error) {
            console.error('Logout error:', error);
            Toast.show({
                type: 'error',
                text1: 'Logout failed',
                text2: 'Unable to log out from Google.',
            });
            return;
        }

        // console.log('Logged out successfully');
        Toast.show({
            type: 'success',
            text1: 'Logout successful',
            text2: 'You have been logged out.',
        });
    };
}
