import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import BaseInput from "@/components/Base/BaseInput";
import { MaterialIcons } from "@expo/vector-icons";
import HomeLogo from "@/assets/svgs/home-logo.svg";
import BaseButton from "@/components/Base/BaseButton";
import { router } from "expo-router";
import { API_UpdatePassword } from "@/network/auth";

const resetPassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const validationSchema = Yup.object({
    currentPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const updatePassword = async (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      setIsLoading(true);
      const res = await API_UpdatePassword(values);
      if (res.status === 200) {
        setIsLoading(false);
        alert("Password updated successfully, please login again.");
        router.replace("/(auth)/login");
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={updatePassword}
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
                <BaseInput
                  value={values.currentPassword}
                  onChangeText={handleChange("currentPassword")}
                  onBlur={handleBlur("currentPassword")}
                  placeholder="Enter your old password"
                  // secureTextEntry
                  isPassword
                  icon={<MaterialIcons name="lock" size={24} color="#000" />}
                  borderColor={
                    touched.currentPassword && errors.currentPassword
                      ? "#FF0000"
                      : "#F5EB10"
                  }
                />
                {touched.currentPassword && errors.currentPassword && (
                  <Text style={styles.errorText}>{errors.currentPassword}</Text>
                )}
                <BaseInput
                  value={values.newPassword}
                  onChangeText={handleChange("newPassword")}
                  onBlur={handleBlur("newPassword")}
                  placeholder="Enter your new password"
                  isPassword
                  icon={<MaterialIcons name="lock" size={24} color="#000" />}
                  borderColor={
                    touched.newPassword && errors.newPassword
                      ? "#FF0000"
                      : "#F5EB10"
                  }
                />
                {touched.newPassword && errors.newPassword && (
                  <Text style={styles.errorText}>{errors.newPassword}</Text>
                )}
                <BaseInput
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  placeholder="Confirm your new password"
                  isPassword
                  icon={<MaterialIcons name="lock" size={24} color="#000" />}
                  borderColor={
                    touched.confirmPassword && errors.confirmPassword
                      ? "#FF0000"
                      : "#F5EB10"
                  }
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
                {/* Submit Button */}
                {error && <Text style={styles.errorText}>{error}</Text>}
              </View>
            </View>
            <View style={styles.submit}>
              <BaseButton
                onPress={() => updatePassword(values)}
                text="Update Password"
                // style={styles.button}
                isLoading={isLoading}
                disabled={!isValid || !dirty}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default resetPassword;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-between",

    // padding: 20,
    // paddingTop: 50,
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
    color: "#F5EB10",
    textDecorationLine: "underline",
    paddingRight: 3,
  },
  button: {
    backgroundColor: "#F5EB10",
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
