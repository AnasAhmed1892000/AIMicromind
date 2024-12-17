import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import BaseInput from "@/components/Base/BaseInput";
import { MaterialIcons } from "@expo/vector-icons";
import HomeLogo from "@/assets/svgs/home-logo.svg";
import BaseButton from "@/components/Base/BaseButton";
import { router } from "expo-router";
export default function ProfileScreen() {
  const [isloading, setIsLoading] = useState<boolean>(false);
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleLogin = (values: { email: string; password: string }) => {
    console.log("Login values:", values);
  };
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
          dirty,
          isSubmitting,
        }) => (
          <View style={styles.formContainer}>
            <View style={styles.logo}>
              <HomeLogo />
            </View>
            <View>
              <View style={styles.form}>
                {/* Email Input */}

                <BaseInput
                  value={"values.name"}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  placeholder="Enter your name"
                  icon={
                    <MaterialIcons
                      name="person-outline"
                      size={24}
                      color="#000"
                    />
                  }
                  borderColor={
                    touched.email && errors.email ? "#FF0000" : "#FFD700"
                  }
                />

                <BaseInput
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  icon={<MaterialIcons name="email" size={24} color="#000" />}
                  borderColor={
                    touched.email && errors.email ? "#FF0000" : "#FFD700"
                  }
                />
                {/* Forgot Password */}

                {/* Submit Button */}
              </View>
            </View>
            <View style={styles.submit}>
              <BaseButton
                onPress={() => null}
                text="Edit Info"
                isLoading={isloading}
                disabled={false}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",

    padding: 20,
    paddingTop: 50,
  },
  logo: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  formContainer: {
    width: "100%",
    justifyContent: "space-evenly",
    flex: 1,
    alignItems: "center",
  },
  submit: {
    width: "70%",
    alignItems: "center",
  },
  form: {
    width: "95%",
    backgroundColor: "#ffffff",
    padding: 10,
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 20,
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    marginBottom: 8,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 10,
    fontSize: 14,
    color: "#fff",
    textDecorationLine: "underline",
    paddingRight: 15,
  },
  signUp: {
    alignSelf: "flex-end",
    marginTop: 10,
    fontSize: 14,
    color: "#fff",

    paddingRight: 3,
  },
  signUpLink: {
    alignSelf: "flex-end",
    marginTop: 10,
    fontSize: 14,
    color: "#FFD700",
    textDecorationLine: "underline",
    paddingRight: 3,
  },
  button: {
    backgroundColor: "#FFD700",
    borderRadius: 25,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
