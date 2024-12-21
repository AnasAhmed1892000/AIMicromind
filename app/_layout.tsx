import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Slot, Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { getToken } from "@/utils/helpers";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const token = await getToken("token");
      if (token) {
        router.replace("/(tabs)/home");
        setIsAuthenticated(true);
      } else {
        router.replace("/login");
      }
    }
    checkAuth();
  }, []);
  const prepare = async () => {
    SplashScreen.hide();
  };
  useEffect(() => {
    const prepareApp = async () => {
      await SplashScreen.hideAsync(); // Hide the splash screen
      router.replace("/SignUp"); // Navigate to the login screen
    };

    prepareApp();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView>
        <Slot />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
