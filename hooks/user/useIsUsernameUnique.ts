import { useEffect, useState } from 'react';

import { useLazyCheckUsernameQuery } from '@/services/userApi';

export function useIsUsernameUnique({ username }: { username: string }) {
    const [isUsernameUnique, setIsUsernameUnique] = useState(true);
    const [loading, setLaoding] = useState(false);
    const [checkUserName] = useLazyCheckUsernameQuery();

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
                setIsUsernameUnique(isUnique); // User exists => NOT unique
            } catch (error) {
                console.log('Error checking username uniqueness:', error);
                setIsUsernameUnique(true); // Assume unique on error
            } finally {
                setLaoding(false);
            }
        }, 600);

        return () => clearTimeout(timeoutId); // cleanup on new keystrokes
    }, [username, checkUserName]);

    return { isUsernameUnique, isUsernameChecking: loading };
}
