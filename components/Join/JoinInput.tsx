import React from 'react';

import { TextInput } from 'react-native';

interface Props {
    code: string;
    setCode: (text: string) => void;
}

export function JoinInput({ code, setCode }: Props) {
    return (
        <TextInput
            value={code}
            onChangeText={setCode}
            placeholder="ENTER CODE"
            placeholderTextColor="#A5B4FC"
            className="text-center outline-none text-3xl font-bold tracking-widest mb-6 py-6 px-6 rounded-2xl bg-indigo-50 dark:bg-gray-800 text-indigo-600 dark:text-white"
        />
    );
}
