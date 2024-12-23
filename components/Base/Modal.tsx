import colors from "@/assets/colors";
import { FC } from "react";
import {
  Modal,
  ModalProps,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

export enum EModalMode {
  CENTER = "center",
  BOTTOM = "bottom",
}

type TModalProps = Partial<ModalProps> & {
  style?: ViewStyle;
  mode?: EModalMode;
  hasClose?: boolean;
};

const BaseModal: FC<TModalProps> = ({
  visible,
  onDismiss,
  children,
  style,
  mode = EModalMode.CENTER,
  hasClose = true,
}) => {
  if (visible)
    return (
      <SafeAreaView>
        <Modal
          transparent
          animationType="slide"
          visible={visible}
          onDismiss={onDismiss}
          onRequestClose={onDismiss}
        >
          <View style={[styles.centeredView, styles[mode]]}>
            <View style={[styles.popup, styles[mode], style]}>{children}</View>
          </View>
        </Modal>
      </SafeAreaView>
    );
};

export default BaseModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    padding: 0,
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.black_overlay,
  },
  bottom: {
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "100%",
    paddingTop: 30,
    backgroundColor: colors.white_0,
    borderRadius: 20,
    maxHeight: 750,
    overflow: "visible",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    alignSelf: "flex-end",
    paddingEnd: 10,
  },
});
