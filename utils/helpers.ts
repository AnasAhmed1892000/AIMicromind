import * as SecureStore from "expo-secure-store";

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
