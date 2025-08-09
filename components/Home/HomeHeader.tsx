import { useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { Link, router } from "expo-router";
import getRandomPersonsImage from "@/utils/functions/getRandomImage";
import { UserSearch } from "@/types/feature.types";
import { authtState } from "@/selectors/authSelector";
import { useAppSelector } from "@/utils/libs/reduxHooks";
import { useLazySearchUsersQuery } from "@/services/featureApi";
import { IconSymbol } from "../ui/IconSymbol";

export function Header() {
  const { width } = useWindowDimensions();
  const isMobile = width < 640; // sm breakpoint

  const { user } = useAppSelector(authtState);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const [searhUsers, { data: usersData }] = useLazySearchUsersQuery();

  const handleSearchChange = (text: string) => {
    setSearch(text);
    if (text.trim().length > 0) {
      searhUsers({ search: text });
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleUserSelect = (selectedUser: UserSearch) => {
    setSearch("");
    setShowDropdown(false);
    router.push({
      pathname: "/profile/[id]",
      params: { id: selectedUser.id.toString() },
    });
  };

  return (
    <View
      style={{
        position: 'relative',
        zIndex: 1000,
      }}
      className="flex-row justify-between flex-wrap px-4 py-3 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800"
    >
      {/* Greeting */}
      <Text className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        <Text className="text-base">Hello</Text>{" "}
        <Text className="text-indigo-400 font-bold">
          {user?.fullName?.toUpperCase()}
        </Text>
      </Text>

      {/* Row: Search + Icons */}
      <View
        className={`flex-row flex-wrap ${isMobile ? "w-full" : ""} align-center gap-3`}
        style={{ position: 'relative', zIndex: 1001 }}
      >
        {/* Search Bar Container */}
        <View
          style={{
            flex: 1,
            position: 'relative',
            zIndex: 1002,
          }}
          className="flex align-center justify-center"
        >
          <TextInput
            value={search}
            onChangeText={handleSearchChange}
            placeholder="Search users..."
            className="bg-gray-100 outline-none web:w-64 dark:bg-gray-800 rounded-full px-4 py-2 text-gray-900 dark:text-white"
            style={{ position: 'relative', zIndex: 1003, outline: 'none' }}
          />

          {/* Dropdown */}
          {showDropdown &&
            usersData?.data &&
            usersData?.data?.length > 0 && (
              <View
                style={{
                  position: 'absolute',
                  top: 50,
                  left: 0,
                  right: 0,
                  zIndex: 1004,
                  elevation: 10, // For Android
                  maxHeight: 280,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }}
                className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <FlatList
                  data={usersData.data}
                  keyExtractor={(item) => item.id.toString()}
                  showsVerticalScrollIndicator={true}
                  nestedScrollEnabled={true}
                  style={{ maxHeight: 260 }}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() => handleUserSelect(item)}
                      className="flex-row items-center px-4 py-3 active:bg-gray-50 dark:active:bg-gray-800"
                      style={{
                        borderBottomWidth: index === (usersData?.data?.length || 0) - 1 ? 0 : 1,
                        borderBottomColor: '#f3f4f6',
                      }}
                      activeOpacity={0.7}
                    >
                      <Image
                        source={{
                          uri: item.image || getRandomPersonsImage(150, 12),
                        }}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <View className="flex-1">
                        <Text className="text-gray-900 dark:text-white font-medium text-base">
                          {item.fullName}
                        </Text>
                        <Text className="text-indigo-600 dark:text-indigo-400 text-sm font-medium">
                          @{item.username}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={() => (
                    <View className="px-5 py-8 items-center">
                      <Text className="text-gray-500 dark:text-gray-400 text-center">
                        No users found
                      </Text>
                    </View>
                  )}
                />
              </View>
            )}
        </View>

        {/* Icons & Avatar */}
        <View className="flex-row items-center gap-2">
          <Link href="/settings" asChild>
            <TouchableOpacity className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 active:opacity-80">
              <IconSymbol size={22} name="gear" color="#6B7280" />
            </TouchableOpacity>
          </Link>
          <Image
            source={{ uri: user?.photo || user?.image || getRandomPersonsImage(150, 12) }}
            className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700"
          />
        </View>
      </View>
    </View>
  );
}