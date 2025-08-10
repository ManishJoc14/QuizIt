import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';

import getRandomPersonsImage from '@/utils/functions/getRandomImage';
import { PersonalInfoForm } from '@/components/Profile/Settings/PersonalInfo/PersonalInfoForm';
import { PersonalInfoHeader } from '@/components/Profile/Settings/PersonalInfo/PersonalInfoHeader';
import { useAppDispatch, useAppSelector } from '@/utils/libs/reduxHooks';
import { useIsUsernameUnique } from '@/hooks/user/useIsUsernameUnique';
import { useUpdateUserMutation } from '@/services/userApi';
import { updateUserState } from '@/features/auth/authSlice';

export default function PersonalInfoScreen() {
    const { user } = useAppSelector(state => state.auth);
    const [updateUser] = useUpdateUserMutation();
    const dispatch = useAppDispatch();

    // Separate state for file (for upload) and uri (for preview)
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUri, setImageUri] = useState<string>(user?.photo || user?.image || getRandomPersonsImage());

    const [fullName, setFullName] = useState(user?.fullName || 'Manish Joshi');
    const [username, setUsername] = useState(user?.username || 'manishjoc14');
    const [email, setEmail] = useState(user?.email || 'manishjoc14@email.com');
    const [isFormValid, setIsFormValid] = useState(false);
    const { isUsernameUnique, isUsernameChecking } = useIsUsernameUnique({ username });

    // onImageChange receives an object with uri and file from pickImage util
    const onImageChange = (data: { uri: string; file: File }) => {
        setImageFile(data.file);
        setImageUri(data.uri);
    };

    const handleSaveChanges = async () => {
        if (!fullName || !username || !email) return;

        let values: { fullName?: string; username?: string; photo?: File | string } = {};

        if (fullName !== user?.fullName) values.fullName = fullName;
        if (username !== user?.username) values.username = username;

        // If user picked a new file, send file, else if uri changed send uri string
        if (imageFile) {
            values.photo = imageFile;
        } else if (imageUri !== user?.photo) {
            values.photo = imageUri;
        }

        try {
            await updateUser({ values }).unwrap();
            dispatch(updateUserState({ ...values, image: imageUri, photo: imageUri }));
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
                    imageUri={imageUri}             // pass URI string only for preview
                    onFullNameChange={setFullName}
                    onUsernameChange={setUsername}
                    onEmailChange={setEmail}
                    onImageChange={onImageChange}   // pass full handler for file & uri
                    onSaveChanges={handleSaveChanges}
                    isUsernameUnique={isUsernameUnique}
                    isUsernameChecking={isUsernameChecking}
                    isFormValid={isFormValid}
                />
            </ScrollView>
        </View>
    );
}
