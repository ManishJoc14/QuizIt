import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import getRandomPersonsImage from '@/utils/functions/getRandomImage';
import { PersonalInfoHeader } from '@/components/Profile/Settings/PersonalInfo/PersonalInfoHeader';
import { PersonalInfoForm } from '@/components/Profile/Settings/PersonalInfo/PersonalInfoForm';
import { useAppSelector } from '@/utils/libs/reduxHooks';
import { useIsUsernameUnique } from '@/hooks/user/useIsUsernameUnique';
import { useUpdateUserMutation } from '@/services/userApi';
import Toast from 'react-native-toast-message';

export default function PersonalInfoScreen() {
    const { user } = useAppSelector(state => state.auth);
    const [updateUser] = useUpdateUserMutation();

    const [fullName, setFullName] = useState(user?.fullName || 'Manish Joshi');
    const [username, setUsername] = useState(user?.username || 'manishjoc14');
    const [email, setEmail] = useState(user?.email || 'manishjoc14@email.com');
    const [image, setImage] = useState(getRandomPersonsImage());
    const [isFormValid, setIsFormValid] = useState(false);
    const { isUsernameUnique, isUsernameChecking } = useIsUsernameUnique({ username });

    const handleSaveChanges = async () => {
        if (!fullName || !username || !email) return;

        let values: { fullName?: string; username?: string; photo?: string } = {};

        if (fullName !== user?.fullName) values.fullName = fullName;
        if (username !== user?.username) values.username = username;
        if (image !== user?.photo) values.photo = image;

        try {
            await updateUser({ values }).unwrap();
            Toast.show({
                type: 'success',
                text1: 'Profile updated successfully',
                text2: 'Your personal information has been updated.',
            });
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    useEffect(() => {
        const valid = fullName && username && email;
        setIsFormValid(Boolean(valid));
    }, [fullName, username, email]);

    return (
        <View className="flex-1 bg-white dark:bg-gray-950">
            <PersonalInfoHeader />
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                <PersonalInfoForm
                    fullName={fullName}
                    username={username}
                    email={email}
                    image={image}
                    onFullNameChange={setFullName}
                    onUsernameChange={setUsername}
                    onEmailChange={setEmail}
                    onImageChange={setImage}
                    onSaveChanges={handleSaveChanges}
                    isUsernameUnique={isUsernameUnique}
                    isUsernameChecking={isUsernameChecking}
                    isFormValid={isFormValid}
                />
            </ScrollView>
        </View>
    );
}
