import { View, Text } from "react-native";
import { type ErrorBoundaryProps } from "expo-router";

export function Error({ retry }: { retry: any }) {
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Text onPress={retry}>
        Error when trying to get your apartments pleaser try again later
      </Text>
    </View>
  );
}
