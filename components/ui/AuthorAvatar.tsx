import { Text, Image, View } from "react-native";

import getRandomPersonsImage from "@/utils/functions/getRandomImage";
import { Button } from "./Button";

interface AuthorAvatarProps {
    name: string;
    avatar?: string;
}

export function AuthorAvatar({ name, avatar }: AuthorAvatarProps) {
    return (
        <Button variant="link" className="no-underline hover:underline">
            <View className="items-center mr-4">
                <Image source={{ uri: avatar ? avatar : getRandomPersonsImage() }} className="w-24 h-24 rounded-full mb-2" />
                <Text className="text-base tracking-wide text-gray-800 dark:text-gray-300 font-medium w-full">
                    {name}
                </Text>
            </View>
        </Button>
    );
}
