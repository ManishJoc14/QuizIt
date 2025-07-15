import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/utils/libs/store';
import { getToken } from '@/utils/libs/secureStorage';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [checking, setChecking] = useState(true);
    const [tokenExists, setTokenExists] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const check = async () => {
            const token = await getToken('accessToken');
            setTokenExists(!!token);
            setChecking(false);
        };
        check();
    }, []);

    // Move navigation into useEffect to avoid setState during render
    useEffect(() => {
        if (!checking && !isAuthenticated && !tokenExists) {
            router.replace('/(auth)/signin');
        }
    }, [checking, isAuthenticated, tokenExists, router]);

    if (checking) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!isAuthenticated && !tokenExists) {
        return null;
    }

    return <>{children}</>;
}
