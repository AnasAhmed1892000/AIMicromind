import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import HomeLogo from "@/assets/svgs/home-logo.svg";
import { router } from "expo-router";
import resetPassword from "./resetpassword";
export enum actionType {
  resetPassword = "resetPassword",
  verifyAccount = "verifyAccount",
}
const verifyAccount = () => {
  const action: actionType = actionType.resetPassword;
  const email = "ahmed@gmail.com";
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <HomeLogo />
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={styles.form}>
          <Text style={styles.title}>
            {action === actionType.resetPassword
              ? "Reset Password"
              : "Verify account"}
          </Text>
          <View style={styles.verificationContainer}>
            <Text style={styles.text}>
              We sent an email to{" "}
              <Text style={styles.highlighted}>ahmed@gmail.com</Text>, Please
              check your email to{" "}
              {action === actionType.resetPassword
                ? "reset your password"
                : "verify your account"}
            </Text>
          </View>
        </View>
        <View style={styles.needHelpContainer}>
          <Text style={styles.needHelp}>Don't Recieve an email ?</Text>
          <TouchableOpacity>
            <Text style={styles.contactUs}>click to resend</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.backContainer}>
        <TouchableOpacity
          onPress={() => {
            router.navigate("/login");
          }}
        >
          <Text style={styles.back}>Back to login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default verifyAccount;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",

    padding: 20,
    paddingTop: 50,
  },
  logo: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  form: {
    width: "95%",
    backgroundColor: "#ffffff",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  verificationContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: "#000",
  },
  highlighted: {
    fontWeight: "bold",
    color: "#000",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },
  needHelpContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: 20,
  },
  needHelp: {
    color: "#fff",
    fontSize: 16,
    // fontWeight: "bold",
  },
  contactUs: {
    color: "#F5EB10",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  backContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    marginBottom: 40,
  },
  back: {
    color: "#F5EB10",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
