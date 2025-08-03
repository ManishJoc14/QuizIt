import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import getRandomPersonsImage from '@/utils/functions/getRandomImage';
import { PersonalInfoHeader } from '@/components/Profile/Settings/PersonalInfo/PersonalInfoHeader';
import { PersonalInfoForm } from '@/components/Profile/Settings/PersonalInfo/PersonalInfoForm';

export default function PersonalInfoScreen() {
    const [name, setName] = useState('Manish Joshi');
    const [email, setEmail] = useState('manishjoc14@email.com');
    const [password, setPassword] = useState('password123');
    const [image, setImage] = useState(getRandomPersonsImage());

    const handleSaveChanges = () => {
        // console.log('Saving changes:', { name, email });
        alert('Changes saved!');
    };

    return (
        <View className="flex-1 bg-white dark:bg-gray-950">
            <PersonalInfoHeader />
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                <PersonalInfoForm
                    name={name}
                    email={email}
                    image={image}
                    password={password}
                    onNameChange={setName}
                    onEmailChange={setEmail}
                    onImageChange={setImage}
                    onPasswordChange={setPassword}
                    onSaveChanges={handleSaveChanges}
                />
            </ScrollView>
        </View>
    );
}
