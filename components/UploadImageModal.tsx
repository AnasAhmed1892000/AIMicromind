import { FC } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

import colors from "@/assets/colors";

import TImage from "@/types/data_types/TImage";
import { openGallery, openCamera } from "@/utils/imagePicker";
import BaseModal, { EModalMode } from "./Modal";

import { Image } from "expo-image";

interface IProps {
  visible: boolean;
  onSelectImage: (arg: TImage) => void;
  onDismiss: () => void;
}

const UploadImageModal: FC<IProps> = ({
  visible,
  onDismiss,
  onSelectImage,
}) => {
  const handleGallery = async () => {
    const image = await openGallery();
    if (image?.uri) onSelectImage(image);
    onDismiss();
  };
  const handleCamera = async () => {
    const image = await openCamera();
    if (image?.uri) onSelectImage(image);
    onDismiss();
  };

  return (
    <BaseModal
      style={styles.modal}
      visible={visible}
      onDismiss={onDismiss}
      mode={EModalMode.BOTTOM}
    >
      <View style={styles.modalContent}>
        <Text>upload image</Text>
        <View style={styles.options}>
          <TouchableOpacity onPress={handleCamera} style={styles.optionBtn}>
            <View style={styles.uploadIcon}>
              <Image
                source={require("@/assets/images/camera.png")}
                style={{ width: 20, height: 20 }}
              />
            </View>
            <Text>open camera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGallery} style={styles.optionBtn}>
            <View style={styles.uploadIcon}>
              <Image
                source={require("@/assets/images/gallery.png")}
                style={{ width: 20, height: 20 }}
              />
            </View>
            <Text>open gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseModal>
  );
};

export default UploadImageModal;

const styles = StyleSheet.create({
  modal: {
    width: "100%",
    flexGrow: 1,
    maxHeight: 200,
  },
  modalContent: {
    rowGap: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  options: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    columnGap: 10,
  },
  optionBtn: {
    borderWidth: 1,
    borderColor: colors.grey_2,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 20,
    rowGap: 8,
    width: "40%",
  },
  uploadIcon: {
    backgroundColor: colors.beige_5,
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
});
