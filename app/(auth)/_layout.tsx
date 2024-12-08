import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import React from "react";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { Slot } from "expo-router";

const AuthLayout = () => {
  return (
    <KeyboardAvoidingView behavior="padding">
      <BackgroundWrapper>
        <Slot />
      </BackgroundWrapper>
    </KeyboardAvoidingView>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
