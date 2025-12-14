import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { COLORS } from "../constants/colors";

export default function LoadingSpinner({ message = "Chargement..." }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.textLight,
  },
});
