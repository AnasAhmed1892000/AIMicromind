import TImage from "@/types/data_types/TImage";
import * as ImagePicker from "expo-image-picker";
import { Image as Compressor } from "react-native-compressor";

export const getCameraPermission = async () => {
  const { status } = await ImagePicker.getCameraPermissionsAsync();
  if (status != "granted") {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status;
  }
  return status;
};

export const openCamera = async () => {
  const status = await getCameraPermission();
  if (status !== "granted") return;

  let result = await ImagePicker.launchCameraAsync();

  if (!result.canceled) {
    const compressedImage = await compressImage(result.assets[0]);
    // console.log("META DATA", await getImageMetaData(compressedImage.uri))
    return compressedImage;
  } else {
    return null;
  }
};

export const getGalleryPermission = async () => {
  const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
  if (status != "granted") {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status;
  }
  return status;
};

export const openGallery = async () => {
  const status = await getGalleryPermission();
  if (status !== "granted") return;

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
  });

  if (!result.canceled) {
    const compressedImage = await compressImage(result.assets[0]);
    return compressedImage;
  } else {
    return null;
  }
};

export const compressImage = async (image: TImage) => {
  const compressedUri = await Compressor.compress(image?.uri as string, {
    compressionMethod: "auto",
    output: "jpg",
  });
  if (compressedUri) {
    return {
      ...image,
      uri: compressedUri,
    };
  } else {
    return {
      ...image,
      uri: image.uri,
    };
  }
};
