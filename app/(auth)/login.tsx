import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import BaseInput from "@/components/Base/BaseInput";
import { MaterialIcons } from "@expo/vector-icons";
import HomeLogo from "@/assets/svgs/home-logo.svg";
const login = () => {
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
      <View style={styles.logo}>
        <HomeLogo />
      </View>

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
        }) => (
          <View style={styles.formContainer}>
            <View style={styles.form}>
              {/* Email Input */}
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
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              {/* Password Input */}
              <BaseInput
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                placeholder="Enter your password"
                secureTextEntry
                icon={<MaterialIcons name="lock" size={24} color="#000" />}
                borderColor={
                  touched.password && errors.password ? "#FF0000" : "#FFD700"
                }
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              {/* Forgot Password */}

              {/* Submit Button */}
            </View>
            <TouchableOpacity>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={styles.submit}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSubmit()}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default login;

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
  },
  formContainer: {
    width: "100%",
  },
  submit: {
    width: "100%",
  },
  form: {
    width: "95%",
    backgroundColor: "#ffffff",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
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
  button: {
    backgroundColor: "#FFD700",
    borderRadius: 25,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
