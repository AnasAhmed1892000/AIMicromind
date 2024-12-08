import BackgroundWrapper from "@/components/BackgroundWrapper";
import { Slot, Stack } from "expo-router";

const SplashLayout = () => {
  return (
    <BackgroundWrapper>
      <Slot />
    </BackgroundWrapper>
  );
};

export default SplashLayout;
