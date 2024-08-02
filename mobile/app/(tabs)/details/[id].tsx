import { ActivityIndicator, Image, StyleSheet, useColorScheme } from "react-native";

import { useApartmentById } from "@/apis/getApartmentById";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Colors } from "@/constants/Colors";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const { setOptions } = useNavigation();
  const { data: apartmentData, isLoading: apartmentLoading } =
    useApartmentById(id);

  useEffect(() => {
    if (id && apartmentData?.data) {
      setOptions({ title: apartmentData?.data?.name, headerShown: true });
    }
  }, [id, apartmentLoading]);

  if (apartmentLoading) {
    return (
      <ThemedView>
        <ActivityIndicator size={50} color={Colors.dark.mainColor} />
      </ThemedView>
    );
  }
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: Colors.dark.mainColor, dark: "#1D3D47" }}
      headerImage={
        <Image
          source={{ uri: apartmentData?.data?.imageUrl }}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView
        style={{
          ...styles.stepContainer,
        }}
      >
        <ThemedView style={styles.fieldStyle}>
          <ThemedText
            style={{
              ...styles.textStyle,
              color: Colors.dark.mainColor,
              fontSize: 28,
            }}
            type="title"
          >
            {apartmentData?.data?.name}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.fieldStyle}>
          <ThemedText style={styles.textStyle} type="subtitle">
            Address:
          </ThemedText>
          <ThemedText
            style={{
              ...styles.textStyle,
              color: Colors.dark.mainColor,
              fontSize: 28,
            }}
            type="subtitle"
          >
            {apartmentData?.data?.address}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.fieldStyle}>
          <ThemedText style={styles.textStyle} type="subtitle">
            City:
          </ThemedText>
          <ThemedText
            style={{
              ...styles.textStyle,
              color: Colors.dark.mainColor,
              fontSize: 28,
            }}
            type="subtitle"
          >
            {apartmentData?.data?.city}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.fieldStyle}>
          <ThemedText style={styles.textStyle} type="subtitle">
            State:
          </ThemedText>
          <ThemedText
            style={{
              ...styles.textStyle,
              color: Colors.dark.mainColor,
              fontSize: 28,
            }}
            type="subtitle"
          >
            {apartmentData?.data?.state}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.fieldStyle}>
          <ThemedText style={styles.textStyle} type="subtitle">
            Units:
          </ThemedText>
          <ThemedText
            style={{
              ...styles.textStyle,
              color: Colors.dark.mainColor,
              fontSize: 28,
            }}
            type="subtitle"
          >
            {apartmentData?.data?.units}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.fieldStyle}>
          <ThemedText style={styles.textStyle} type="subtitle">
            ZidCode:
          </ThemedText>
          <ThemedText
            style={{
              ...styles.textStyle,
              color: Colors.dark.mainColor,
              fontSize: 28,
            }}
            type="subtitle"
          >
            {apartmentData?.data?.zipCode}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.fieldStyle}>
          <ThemedText style={styles.textStyle} type="subtitle">
            Price:
          </ThemedText>
          <ThemedText
            style={{
              ...styles.textStyle,
              color: Colors.dark.mainColor,
              fontSize: 28,
            }}
            type="subtitle"
          >
            {apartmentData?.data?.price} EGP
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.fieldStyle}>
          <ThemedText style={styles.textStyle} type="subtitle">
            Rating:
          </ThemedText>
          <ThemedText
            style={{
              ...styles.textStyle,
              color: Colors.dark.mainColor,
              fontSize: 28,
            }}
            type="subtitle"
          >
            {apartmentData?.data?.ratings}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  fieldStyle: {
    gap: 8,
    padding: 8,
  },
  textStyle: {
    textAlign: "justify",
    fontSize: 24,
  },
});
