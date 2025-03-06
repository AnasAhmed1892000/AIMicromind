import { AxiosError } from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { showMessage } from "react-native-flash-message";
import * as FileSystem from "expo-file-system";
import TErrorResponse from "@/types/data_types/TErrorResponse";
export async function saveToken(key: string, value: string) {
  try {
    await SecureStore.setItemAsync(key, value);
    // console.log("Token saved successfully");
  } catch (error) {
    console.error("Error saving token:", error);
  }
}
export async function getToken(key: string) {
  try {
    const token = await SecureStore.getItemAsync(key);
    if (token) {
      // console.log("Token retrieved:", token);
    } else {
      // console.log("No token found");
    }
    return token;
  } catch (error) {
    // console.error("Error retrieving token:", error);
  }
}
export async function deleteToken(key: string) {
  try {
    await SecureStore.deleteItemAsync(key);
    // console.log("Token deleted successfully");
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
  const message = (error as TErrorResponse).response?.data.message;
  showMessage({
    message: message ? message : "Something went wrong",
    type: "danger",
    icon: "danger",
  });
  if (
    error?.status === 401 &&
    (error as TErrorResponse).response?.data?.message !==
      "Invalid email or password. Try again."
  ) {
    try {
      await deleteToken("token");
      const message = (error as TErrorResponse).response?.data.message;
      showMessage({
        message: message ? message : "Session expired, please login again",
        type: "danger",
        icon: "danger",
      });
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Error handling expired token:", error);
    }
  }
}
export const truncateText = (text: string) => {
  if (!text) return "";
  const words = text.split(" ");

  if (words.length > 2) {
    return words.slice(0, 2).join(" ") + "...";
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
