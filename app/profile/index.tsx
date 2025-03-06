import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
  Alert,
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
import { API_GetUserProfile, API_UpdateProfile } from "@/network/content";
import { baseUrl, baseUrls } from "@/network";
import * as ImagePicker from "expo-image-picker";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import * as FileSystem from "expo-file-system";
import { deleteToken } from "@/utils/helpers";
import { API_Logout } from "@/network/auth";
export interface TProfileData {
  isVerified: boolean;
  _id: string;
  fullName: string;
  email: string;
  photo: string;
  __v: number;
}
export default function ProfileScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<TProfileData | null>(null);
  const [selectedImage, setSelectedImage] =
    useState<ImagePicker.ImagePickerAsset | null>(null);

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const GetProfileData = async () => {
    try {
      setIsLoading(true);
      const res = await API_GetUserProfile();
      if (res.status === 200) {
        // console.log("profile data:", res.data.data.user);
        setProfileData(res.data.data.user);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("error: ", error);
      setIsLoading(false);
    }
  };
  useLayoutEffect(() => {
    GetProfileData();
  }, []);

  const pickImage = async () => {
    // Request permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "You need to allow access to the gallery."
      );
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]); // Update with the selected image's URI
    } else {
      Alert.alert("Cancelled", "Image selection was cancelled.");
    }
  };
  const updateProfileData = async (values: { name: string; email: string }) => {
    const formData = new FormData();
    if (selectedImage) {
      const fileBlob = await FileSystem.readAsStringAsync(selectedImage.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      console.log(selectedImage);
      formData.append("photo", {
        uri: selectedImage.uri,
        type: selectedImage.mimeType,
        name: selectedImage.fileName,
      });
    }
    if (values.name) {
      formData.append("fullName", values.name);
    }
    if (values.email) {
      formData.append("email", values.email);
    }
    try {
      setIsLoading(true);
      const res = await API_UpdateProfile(formData);
      if (res.status === 200) {
        console.log("updated profile data:", res.data);
        // console.log("updated profile data:", res.data.data.updatedUser);
        setIsEditing(false);
        setSelectedImage(null);
        setIsLoading(false);
        GetProfileData();
      }
    } catch (error) {
      console.log("error: ", error);
      setIsLoading(false);
    }
  };
  const logout = async () => {
    try {
      const response = await API_Logout();
      if (response.status === 200) {
        await deleteToken("token");
        router.replace("/login");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  return (
    <BackgroundWrapper>
      <>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <>
            <View style={styles.container}>
              <BaseHeader
                title="Profile"
                onBack={() => router.navigate("/(tabs)/home")}
              />
              <Formik
                initialValues={{
                  name: profileData?.fullName || "",
                  email: profileData?.email || "",
                }}
                validationSchema={validationSchema}
                onSubmit={updateProfileData}
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
                    <TouchableOpacity
                      style={styles.logo}
                      disabled={!isEditing}
                      onPress={pickImage}
                    >
                      <Image
                        source={{
                          uri: selectedImage?.uri
                            ? selectedImage.uri
                            : `${baseUrl}${profileData?.photo}`,
                        }}
                        style={styles.profileImage}
                      />
                    </TouchableOpacity>
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
                            touched.email && errors.email
                              ? "#FF0000"
                              : "#F5EB10"
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
                          icon={
                            <MaterialIcons
                              name="email"
                              size={24}
                              color="#000"
                            />
                          }
                          borderColor={
                            touched.email && errors.email
                              ? "#FF0000"
                              : "#F5EB10"
                          }
                        />
                        {touched.email && errors.email && (
                          <Text style={styles.errorText}>{errors.email}</Text>
                        )}
                      </View>
                    </View>
                    <View style={styles.submit}>
                      <BaseButton
                        onPress={
                          isEditing
                            ? () => updateProfileData(values)
                            : () => setIsEditing(!isEditing)
                        }
                        text={isEditing ? "Submit" : "Edit Info"}
                        isLoading={isLoading}
                        disabled={false}
                        style={styles.button}
                      />
                      <BaseButton
                        onPress={() => router.navigate("/(auth)/resetPassword")}
                        text="Change password"
                        isLoading={isLoading}
                        disabled={false}
                        style={styles.btnOutline}
                        textColor="#F5EB10"
                      />
                    </View>
                    <View style={styles.logout}>
                      <BaseButton
                        onPress={() => logout()}
                        text="Logout"
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
          </>
        )}
      </>
    </BackgroundWrapper>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    // padding: 20,
    paddingTop: Platform.OS === "ios" ? 30 : 0,
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
    marginBottom: 20,
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
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  logout: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
});
