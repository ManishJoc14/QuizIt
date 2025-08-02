import { Appearance, Platform } from "react-native";

if (Platform.OS === "web") {
  Appearance.setColorScheme = (scheme) => {
    document.documentElement.setAttribute("data-theme", scheme ?? "light");
  };

  Appearance.getColorScheme = (): "light" | "dark" | null => {
    const systemValue: "light" | "dark" =
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    const userValue = document.documentElement.getAttribute("data-theme");
    if (userValue === "light" || userValue === "dark") {
      return userValue;
    }
    return systemValue;
  };

  Appearance.addChangeListener = (listener) => {
    const systemValueListener = (e: MediaQueryListEvent): void => {
      const newSystemValue: "light" | "dark" = e.matches ? "dark" : "light";
      const userValue = document.documentElement.getAttribute("data-theme");
      listener({
        colorScheme:
          userValue && userValue !== "null" ? (userValue as "light" | "dark") : newSystemValue,
      });
    };
    const systemValue = window.matchMedia("(prefers-color-scheme: dark)");
    systemValue.addEventListener("change", systemValueListener);

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.attributeName === "data-theme") {
          listener({ colorScheme: Appearance.getColorScheme() });
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true });

    function remove() {
      systemValue.removeEventListener("change", systemValueListener);
      observer.disconnect();
    }

    return { remove };
  };
}
