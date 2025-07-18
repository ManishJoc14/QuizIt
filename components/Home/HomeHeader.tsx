import { Image, Text, TouchableOpacity, View } from "react-native";
import getRandomPersonsImage from "@/utils/functions/getRandomImage";
import { IconSymbol } from "../ui/IconSymbol";
import { Link } from "expo-router";
import { authtState } from "@/selectors/authSelector";
import { useAppSelector } from "@/utils/libs/reduxHooks";

export function Header() {
  const { user } = useAppSelector(authtState);
  return (
    <View className="flex-row items-center justify-between px-6 py-2 sm:py-4 bg-white dark:bg-gray-950">
      {/* Greeting */}
      <Text className="text-2xl tracking-wider font-semibold text-gray-900 dark:text-white">
        Hello {user?.username}!
      </Text>

      {/* Right section: Search, Notification, Avatar */}
      <View className="flex-row items-center gap-3">
        {/* Notification Icon */}
        <TouchableOpacity className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 active:opacity-80">
          <IconSymbol size={22} name="bell" color="#6B7280" />
        </TouchableOpacity>

        {/* Search Icon */}
        <Link href="/settings" asChild>
          <TouchableOpacity className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 active:opacity-80">
            <IconSymbol size={22} name="gear" color="#6B7280" />
          </TouchableOpacity>
        </Link>

        {/* Avatar */}
        <Image
          source={{ uri: user?.photo || getRandomPersonsImage(150, 12) }}
          className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700"
        />
      </View>
    </View>
  );
}
