import { useEffect, useState } from "react";
import { Platform } from "react-native";
import { usePathname, useLocalSearchParams } from "expo-router";

export function useFullUrl() {
  const pathname = usePathname();
  const params = useLocalSearchParams();
  const [fullUrl, setFullUrl] = useState<string | null>(null);

  useEffect(() => {
    if (Platform.OS === "web") {
      // Web: just use window.location
      setFullUrl(window.location.href);
    }else {
      
    }
  }, [pathname, params]);

  return fullUrl;
}
