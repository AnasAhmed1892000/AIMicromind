import { axios, AxiosError } from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";
import * as FileSystem from "expo-file-system";
export async function saveToken(key: string, value: string) {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log("Token saved successfully");
  } catch (error) {
    console.error("Error saving token:", error);
  }
}
export async function getToken(key: string) {
  try {
    const token = await SecureStore.getItemAsync(key);
    if (token) {
      console.log("Token retrieved:", token);
    } else {
      console.log("No token found");
    }
    return token;
  } catch (error) {
    console.error("Error retrieving token:", error);
  }
}
export async function deleteToken(key: string) {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log("Token deleted successfully");
  } catch (error) {
    console.error("Error deleting token:", error);
  }
}
export function formatTimeTo12Hour(isoString: string): string {
  const date = new Date(isoString); // Convert the ISO string to a Date object
  let hours = date.getHours(); // Get the hours in 24-hour format
  const minutes = String(date.getMinutes()).padStart(2, "0"); // Get minutes and pad to 2 digits
  const amPm = hours >= 12 ? "PM" : "AM"; // Determine AM or PM

  hours = hours % 12 || 12; // Convert 24-hour time to 12-hour format, treating 0 as 12

  return `${hours}:${minutes} ${amPm}`; // Return the formatted time
}
export async function handleTokenExpires(error: AxiosError) {
  if (error?.status === 500 && error.response.data.message === "jwt expired") {
    try {
      await deleteToken("token");
      Alert.alert(
        "Session Expired",
        "Your session has expired. Please log in again."
      );
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Error handling expired token:", error);
    }
  } else if (
    error?.status === 401 &&
    error.response.data.message ===
      "Password was changed recently. Please login again."
  ) {
    try {
      await deleteToken("token");
      Alert.alert("Session Expired", error.response.data.message);
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Error handling expired token:", error);
    }
  }
}
export const truncateText = (text: string) => {
  if (!text) return "";
  const words = text.split(" ");

  if (words.length > 4) {
    return words.slice(0, 4).join(" ") + "...";
  }

  return text;
};
export const ReadAsAsync = async (uri: string) => {
  const fileBlob = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
};
export const getFileType = (fileName: string) => {
  const fileType = fileName.slice(fileName.lastIndexOf(".") + 1);
  return fileType;
};
