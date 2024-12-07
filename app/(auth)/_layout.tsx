import { StyleSheet, Text, View } from "react-native";
import React from "react";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { Slot } from "expo-router";

const AuthLayout = () => {
  return (
    <BackgroundWrapper>
      <Slot />
    </BackgroundWrapper>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
