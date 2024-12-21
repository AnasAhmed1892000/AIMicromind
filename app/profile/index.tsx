import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import BaseInput from "@/components/Base/BaseInput";
import { MaterialIcons } from "@expo/vector-icons";
import HomeLogo from "@/assets/svgs/home-logo.svg";
import BaseButton from "@/components/Base/BaseButton";
import { router } from "expo-router";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import images from "@/assets/images/images";
import BaseHeader from "@/components/Base/BaseHeader";
export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleLogin = (values: { name: string; email: string }) => {
    console.log("Login values:", values);
  };
  return (
    <BackgroundWrapper>
      <BaseHeader
        title="Profile"
        onBack={() => router.navigate("/(tabs)/home")}
      />
      <View style={styles.container}>
        <Formik
          initialValues={{
            name: "Anas Eltanany",
            email: "anas@aimicromind.com",
          }}
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
                <Image source={images.profile} />
              </View>
              <View>
                <View style={styles.form}>
                  <BaseInput
                    value={values.name}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    disabled={!isEditing}
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
                    disabled={!isEditing}
                    icon={<MaterialIcons name="email" size={24} color="#000" />}
                    borderColor={
                      touched.email && errors.email ? "#FF0000" : "#F5EB10"
                    }
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>
              </View>
              <View style={styles.submit}>
                <BaseButton
                  onPress={() => setIsEditing(!isEditing)}
                  text={isEditing ? "Submit" : "Edit Info"}
                  isLoading={isLoading}
                  disabled={false}
                  style={styles.button}
                />
                <BaseButton
                  onPress={() => null}
                  text="Change password"
                  isLoading={isLoading}
                  disabled={false}
                  style={styles.btnOutline}
                  textColor="#F5EB10"
                />
              </View>
            </View>
          )}
        </Formik>
        <View style={styles.needHelpContainer}>
          <Text style={styles.needHelp}>Need any help?</Text>
          <TouchableOpacity>
            <Text style={styles.contactUs}>contact us</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BackgroundWrapper>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === "ios" ? 50 : 0,
  },
  logo: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  formContainer: {
    width: "100%",
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  submit: {
    width: "100%",
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  form: {
    width: "95%",
    backgroundColor: "#ffffff",
    padding: 10,
    justifyContent: "center",
    alignItems: "flex-start",
    borderRadius: 20,
    marginTop: 25,
    marginBottom: 15,
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
    width: "45%",
  },
  btnOutline: {
    width: "45%",
    backgroundColor: "#000",
    borderColor: "#F5EB10",
    borderWidth: 1,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
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
    color: "#fff",
    fontSize: 16,
    textDecorationLine: "underline",
    // fontWeight: "bold",
  },
});
