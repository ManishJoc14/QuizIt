import { useEffect, useState } from 'react';

import { useLazyGetUserQuery } from '@/services/userApi';

export function useIsUsernameUnique({ username }: { username: string }) {
    const [isUsernameUnique, setIsUsernameUnique] = useState(true);
    const [loading, setLaoding] = useState(false);
    // const [getUser] = useLazyGetUserQuery();

    // useEffect(() => {
    //     if (!username) {
    //         setIsUsernameUnique(true);
    //         setLaoding(false);
    //         return;
    //     }
    //     setLaoding(true);
    //     const timeoutId = setTimeout(async () => {
    //         try {
    //             const user = await getUser({ username }).unwrap();
    //             setIsUsernameUnique(!user); // User exists => NOT unique
    //         } catch (error) {
    //             console.log('Error checking username uniqueness:', error);
    //             setIsUsernameUnique(true); // User not found => unique
    //         } finally {
    //             setLaoding(false);
    //         }
    //     }, 600);

    //     return () => clearTimeout(timeoutId); // cleanup on new keystrokes
    // }, [username, getUser]);

    // return { isUsernameUnique: false, isUsernameChecking: loading };
    return { isUsernameUnique: true, isUsernameChecking: false };
}
