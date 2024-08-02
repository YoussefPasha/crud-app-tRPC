import { StyleSheet } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import HomeApartmentScreen from "@/components/screens/home";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <ThemedView style={styles.welcome}>
      <ThemedView style={{ flexDirection: "row" }}>
        <ThemedText type="title">
          Welcome to <ThemedText type="title" style={{color:"#6ea3d4"}} >CRUD!</ThemedText>
        </ThemedText>
        <HelloWave />
      </ThemedView>

      <HomeApartmentScreen />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  welcome: {
    paddingTop: 80,
    alignItems: "center",
    flexDirection: "column",
    gap: 8,
  },
});
