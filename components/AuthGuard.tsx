import { useEffect, useState } from 'react'
import { ActivityIndicator, Platform, View } from 'react-native'
import { useLocalSearchParams, usePathname, useRouter } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/libs/store';


export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const [checking, setChecking] = useState(true)
    const router = useRouter()
    const pathname = usePathname();
    const queryParams = useLocalSearchParams();

    useEffect(() => {
        if (!isAuthenticated) {
            let fullPath;

            if (Platform.OS === "web") {
                // Full path + query
                fullPath = window.location.pathname + window.location.search;
            } else {
                // Rebuild from pathname + params on native
                const queryString = Object.entries(queryParams)
                    .filter(([key]) => key !== "id") // optional: exclude path params
                    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
                    .join("&");

                fullPath = queryString ? `${pathname}?${queryString}` : pathname;
            }

            console.log("Redirecting to sign-in now then", fullPath);

            router.replace({
                pathname: "/(auth)/signin",
                params: { next: fullPath },
            });
        } else {
            setChecking(false);
        }
    }, [isAuthenticated, pathname, router, queryParams]);

    if (checking) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return <>{children}</>
}
