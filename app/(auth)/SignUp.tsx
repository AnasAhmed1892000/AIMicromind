import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import BaseInput from "@/components/Base/BaseInput";
import { MaterialIcons } from "@expo/vector-icons";
import HomeLogo from "@/assets/svgs/home-logo.svg";
import BaseButton from "@/components/Base/BaseButton";
import { router } from "expo-router";
import { API_Register } from "@/network/auth";
import * as SecureStore from "expo-secure-store";
import { saveToken } from "@/utils/helpers";
const validationSchema = Yup.object({
  name: Yup.string()
    .min(6, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});
const SignUp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleRegister = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    setIsLoading(true);
    let data = {
      fullName: values.name,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    try {
      const response = await API_Register(data);
      console.log(response.data);
      if (response.status === 200 || response.status === 201) {
        await saveToken("token", response.data.token);
        router.replace("/(tabs)/home");
        setIsLoading(false);
        console.log(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("error: ", error);
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
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
                  value={values.name}
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
                    touched.email && errors.email ? "#FF0000" : "#F5EB10"
                  }
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
                <BaseInput
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  icon={<MaterialIcons name="email" size={24} color="#000" />}
                  borderColor={
                    touched.email && errors.email ? "#FF0000" : "#F5EB10"
                  }
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <BaseInput
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  placeholder="Enter your password"
                  secureTextEntry
                  icon={<MaterialIcons name="lock" size={24} color="#000" />}
                  borderColor={
                    touched.password && errors.password ? "#FF0000" : "#F5EB10"
                  }
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <BaseInput
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  placeholder="Confirm your password"
                  secureTextEntry
                  icon={<MaterialIcons name="lock" size={24} color="#000" />}
                  borderColor={
                    touched.password && errors.password ? "#FF0000" : "#F5EB10"
                  }
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>
            </View>
            <View style={styles.submit}>
              <BaseButton
                onPress={handleSubmit}
                text="Sign Up"
                // style={styles.button}
                isLoading={isLoading}
                disabled={!isValid || !dirty || isSubmitting}
              />
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
                onPress={() => router.navigate("/(auth)/login")}
              >
                <Text style={styles.signUp}>Already have account?</Text>
                <Text style={styles.signUpLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignUp;

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
    marginBottom: 20,
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
