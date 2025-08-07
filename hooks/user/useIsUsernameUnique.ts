import { useEffect, useState } from 'react';

import { useLazyCheckUsernameQuery } from '@/services/userApi';
import { useAppSelector } from '@/utils/libs/reduxHooks';

export function useIsUsernameUnique({ username }: { username: string }) {
    const [isUsernameUnique, setIsUsernameUnique] = useState(true);
    const [loading, setLaoding] = useState(false);
    const [checkUserName] = useLazyCheckUsernameQuery();
    const { user } = useAppSelector(state => state.auth);

    useEffect(() => {
        if (!username) {
            setIsUsernameUnique(true);
            setLaoding(false);
            return;
        }
        setLaoding(true);
        const timeoutId = setTimeout(async () => {
            try {
                const { isUnique } = await checkUserName({ username }).unwrap();
                if (user?.username === username) {
                    setIsUsernameUnique(true); // Current user's username is always unique
                } else {
                    setIsUsernameUnique(isUnique); // User exists => NOT unique
                }
            } catch (error) {
                console.error('Error checking username uniqueness:', error);
                setIsUsernameUnique(true); // Assume unique on error
            } finally {
                setLaoding(false);
            }
        }, 600);

        return () => clearTimeout(timeoutId); // cleanup on new keystrokes
    }, [username, checkUserName, user?.username]);

    return { isUsernameUnique, isUsernameChecking: loading };
}
