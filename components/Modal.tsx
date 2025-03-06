import colors from "@/assets/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FC, useEffect, useState } from "react";
import {
  Keyboard,
  Modal,
  ModalProps,
  Platform,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

export enum EModalMode {
  CENTER = "center",
  BOTTOM = "bottom",
}

enum EKeyboardStatus {
  OPEN = "open",
  CLOSE = "close",
}

type TModalProps = Partial<ModalProps> & {
  style?: StyleProp<ViewStyle>;
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
  // STATE
  const [keyboardStatus, setKeyboardStatus] = useState<EKeyboardStatus>(
    EKeyboardStatus.CLOSE
  );
  // EFFECTS
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(EKeyboardStatus.OPEN);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(EKeyboardStatus.CLOSE);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

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
            <View
              style={[
                styles.popup,
                {
                  height:
                    Platform.OS === "ios" &&
                    keyboardStatus === EKeyboardStatus.OPEN
                      ? 700
                      : 300,
                },
                styles[mode],
                style,
              ]}
            >
              {hasClose && (
                <TouchableOpacity
                  style={styles.buttonClose}
                  onPress={onDismiss}
                  hitSlop={20}
                >
                  <AntDesign name="closecircleo" size={24} color="black" />
                </TouchableOpacity>
              )}
              {children}
            </View>
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
    // height: Platform.OS === "ios" ? 700 : 300,
    overflow: "hidden",
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
    paddingEnd: 20,
  },
});
