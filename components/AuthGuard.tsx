import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from '@/utils/libs/store';


export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    const [checking, setChecking] = useState(true)
    const router = useRouter()

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/(auth)/signin')
        } else {
            setChecking(false)
        }
    }, [isAuthenticated, router])

    if (checking) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return <>{children}</>
}
