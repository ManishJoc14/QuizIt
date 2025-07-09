import { Text, Image, View } from "react-native";

import getRandomPersonsImage from "@/utils/functions/getRandomImage";

interface AuthorAvatarProps {
    name: string;
    avatar?: string;
}

export function AuthorAvatar({ name, avatar }: AuthorAvatarProps) {
    return (
        <View className="justify-center items-center mr-4">
            <Image source={{ uri: avatar ? avatar : getRandomPersonsImage() }} className="w-20 h-20 rounded-full mb-2" />
            <Text className="text-base tracking-wide text-gray-800 dark:text-gray-300 font-medium w-24 text-center"
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {name}
            </Text>
        </View>
    );
}

export function UserAvatar({ name, username, image }: { name?: string; username?: string; image?: string }) {
    return (
        <View className="flex-row items-center">
            <Image
                source={{ uri: image ? image : getRandomPersonsImage() }}
                className="w-20 h-20 rounded-full mr-3"
            />
            <View>
                <Text className="text-lg tracking-wider font-semibold text-gray-900 dark:text-white"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {name || 'Anonymous'}
                </Text>
                <Text className="text-base tracking-wide text-gray-400 dark:text-gray-100">{username}</Text>
            </View>
        </View>
    )
}