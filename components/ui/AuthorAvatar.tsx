import { Text, Image, Pressable } from "react-native";

import { Link } from "expo-router";

import getRandomPersonsImage from "@/utils/functions/getRandomImage";
import { getCapitalizedName } from "@/utils/functions/formatter";

interface AuthorAvatarProps {
    id: number;
    name: string;
    avatar?: string;
    isUserJoined?: boolean;
}

export function AuthorAvatar({ id, name, avatar, isUserJoined }: AuthorAvatarProps) {
    return (
        <Link href={{
            pathname: "/profile/[id]", params: { id: id.toString() }
        }}
            asChild>
            <Pressable className="justify-center items-center mr-4">
                <Image source={{ uri: avatar ? avatar : getRandomPersonsImage() }} className="w-20 h-20 rounded-full mb-2" />
                <Text className="text-base tracking-wide text-gray-800 dark:text-gray-300 font-medium w-24 text-center"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {getCapitalizedName(name || 'Anonymous')}
                </Text>
            </Pressable>
        </Link>
    );
}

export function UserAvatar({ id, name, username, image }: { id: number, name?: string; username?: string; image?: string }) {
    return (
        <Link href={
            { pathname: "/profile/[id]", params: { id: id.toString() } }
        } asChild
            className="mt-4"
        >
            <Pressable className="flex-row items-center">
                <Image
                    source={{ uri: image ? image : getRandomPersonsImage() }}
                    className="w-20 h-20 rounded-full mr-3"
                />
                <Pressable>
                    <Text className="text-lg tracking-wider font-semibold text-gray-900 dark:text-white"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {getCapitalizedName(name || 'Anonymous')}
                    </Text>
                    <Text className="text-base tracking-wide text-gray-400 dark:text-gray-100">{username}</Text>
                </Pressable>
            </Pressable>
        </Link>
    )
}

export function InviteUserAvatarDetailed({ id, name, username, avatar, isUserJoined }: AuthorAvatarProps & { username: string }) {
    return (
        <Pressable className="flex-row items-center">
            <Image
                source={{ uri: avatar ? avatar : getRandomPersonsImage() }}
                className={`w-20 h-20 rounded-full mr-3  border-2 ${isUserJoined ? "border-green-500" : "border-gray-500"}`}
            />
            <Pressable>
                <Text className="text-lg tracking-wider font-semibold text-gray-900 dark:text-white"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {getCapitalizedName(name || 'Anonymous')}
                </Text>
                <Text className="text-base tracking-wide text-gray-400 dark:text-gray-100">{username}</Text>
            </Pressable>
        </Pressable>
    );
}
export function InviteUserAvatar({ id, name, avatar, isUserJoined }: AuthorAvatarProps) {
    console.log(`InviteUserAvatar: ${name}, Joined: ${isUserJoined}`);
    return (
        <Pressable className="justify-center items-center mr-4">
            <Image source={{ uri: avatar ? avatar : getRandomPersonsImage() }} className={`w-20 h-20 rounded-full mb-2 border-2 ${isUserJoined ? "border-green-500" : "border-gray-500"}`} />
            <Text className="text-base tracking-wide text-gray-800 dark:text-gray-300 font-medium w-24 text-center"
                numberOfLines={1}
                ellipsizeMode="tail"
            >
                {getCapitalizedName(name || 'Anonymous')}
            </Text>
        </Pressable>
    );
}