import { useRouter } from 'expo-router';


import { SignInRequest } from '@/types/auth.types';
import { saveToken } from '@/utils/libs/secureStorage';
import { setCredentials } from '@/features/auth/authSlice';
import { useSignInMutation } from '@/services/authApi';
import { useAppDispatch } from '@/utils/libs/reduxHooks';
import Toast from 'react-native-toast-message';

export function useSignIn() {
    const [login, { isLoading, error }] = useSignInMutation();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const signIn = async (data: SignInRequest) => {
        console.log('Signing in with data:', data);
        try {
            const res = await login(data).unwrap();
            dispatch(setCredentials(res));
            console.log('Login successful:', res);
            await saveToken('accessToken', res.accessToken);
            await saveToken('refreshToken', res.refreshToken);
            // console.log('Login successful. Redirecting to home.');
            Toast.show({
                type: 'success',
                text1: 'Login successful',
                text2: 'Welcome back to QuizIt!',
            })
            router.replace('/(tabs)');
        } catch (err) {
            console.log('Login failed:', err);
        }
    };

    return { signIn, isLoading, error };
}
