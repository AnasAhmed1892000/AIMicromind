if (__DEV__) {
  require("../ReactotronConfig");
}
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
import { Provider as PaperProvider } from "react-native-paper";
import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { getToken } from "@/utils/helpers";
import FlashMessage from "react-native-flash-message";
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

  // const prepare = async () => {
  //   SplashScreen.hide();
  // };
  useEffect(() => {
    const prepareApp = async () => {
      await SplashScreen.hideAsync();
      router.replace("/(splash)");
      const token = await getToken("token");
      console.log(`retrieved token: ${token}`);
      if (token) {
        router.replace("/(tabs)/home");
        setIsAuthenticated(true);
      } else {
        router.replace("/(auth)/login");
      } // Navigate to the login screen
    };

    prepareApp();
  }, []);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PaperProvider>
        <GestureHandlerRootView>
          <StatusBar />
          <Slot />
          <FlashMessage
            testID={"Alert"}
            accessibilityLabel={"Alert"}
            accessible={true}
            position="top"
            floating
            duration={5000}
            statusBarHeight={40}
            animated={true}
            animationDuration={200}
          />
        </GestureHandlerRootView>
      </PaperProvider>
    </ThemeProvider>
  );
}
