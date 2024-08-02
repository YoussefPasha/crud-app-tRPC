import {
  Dimensions,
  Image,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { IApartment } from "@/@types/apartment";
import { router } from "expo-router";

const Apartment = ({ data }: { data: IApartment }) => {
  const colorScheme = useColorScheme() ?? "light";
  const borderBottomColor = { light: "#000", dark: "#fff" };

  return (
    <TouchableOpacity onPress={() => router.navigate(`/details/${data.id}`)}>
      <ThemedView
        style={{
          ...styles.apartmentStyle,
          borderBottomColor: borderBottomColor[colorScheme],
        }}
      >
        <ThemedView>
          <Image
            source={{ uri: data.imageUrl }}
            style={{
              ...styles.imageStyle,
              width: Dimensions.get("window").width - 40,
            }}
          />
          <ThemedView style={{ gap: 8 }}>
            <ThemedText type="title" style={{ color: "#6ea3d4" }}>
              {data.name}
            </ThemedText>
            <ThemedText type="subtitle">Address: {data.address}</ThemedText>
            <ThemedText type="subtitle">Price: {data.price} EGP</ThemedText>
            <ThemedText type="subtitle">Rating: {data.ratings}</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
};

export default Apartment;

const styles = StyleSheet.create({
  apartmentStyle: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    paddingBottom: 20,
  },
  imageStyle: {
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
});
