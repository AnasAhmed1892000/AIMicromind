import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  title: string;
  onBack?: () => void;
}

const BaseHeader: React.FC<Props> = ({ title, onBack }) => {
  return (
    <View style={styles.container}>
      {onBack && (
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="chevron-back-outline" size={24} color="white" />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
  title: {
    fontSize: 20,
    color: "white",
    fontWeight: "500",
    marginLeft: 16,
  },
});

export default BaseHeader;
