import BackgroundWrapper from "@/components/BackgroundWrapper";
import { Href, router } from "expo-router";
import Logo from "@/assets/svgs/logo";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

const Splash = () => {
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const startApp = () => {
    if (false) {
      router.replace("/(auth)/login");
    } else {
      router.replace("/(tabs)/home");
    }
  };
  const timer = setTimeout(() => {
    setIsFinished(true);
  }, 4000);
  useEffect(() => {
    if (isFinished) {
      startApp();
    }
  }, [isFinished]);

  return (
    <SafeAreaView style={styles.screen}>
      <Logo />
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  screen: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
