import { IApartment } from "@/@types/apartment";
import { useApartmentsList } from "@/apis/listApartments";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import React from "react";
import {
  ActivityIndicator,
  Button,
  Dimensions,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Touchable,
  TouchableOpacity,
} from "react-native";
import Apartment from "../Apartment";
import { ThemedText } from "../ThemedText";
import { Error } from "../error";
import { Ionicons } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ItemView = ({ item }: { item: IApartment }) => {
  return <Apartment data={item} />;
};

const formSchema = z
  .object({
    ratings: z.string().optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.minPrice !== undefined && data.maxPrice !== undefined) {
        return Number(data.minPrice) <= Number(data.maxPrice);
      }
      return true;
    },
    {
      path: ["minPrice", "maxPrice"],
    }
  );

const HomeApartmentScreen = () => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      ratings: undefined,
      minPrice: undefined,
      maxPrice: undefined,
    },
    resolver: zodResolver(formSchema),
  });
  const flatListRef = React.useRef<FlatList<IApartment>>(null);

  const { ratings, minPrice, maxPrice } = watch();

  const {
    data: apartmentsListData,
    isLoading: apartmentsLoading,
    isFetching,
    refetch,
    isError: isApartmentsError,
  } = useApartmentsList({
    ratings,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
  });

  const onSubmitHandler = (data: any) => {
    refetch(data);
  };

  return (
    <ThemedView style={styles.listContainer}>
      <SafeAreaView style={{ flex: 1, marginTop: 20, marginBottom: 100 }}>
        {isApartmentsError && <Error retry={refetch} />}
        {apartmentsLoading ? (
          <ActivityIndicator size={50} color={Colors.dark.mainColor} />
        ) : (
          <ThemedView>
            {apartmentsListData?.data?.length === 0 && (
              <ThemedText
                type="defaultSemiBold"
                style={{
                  textAlign: "center",
                  color: "#8d4563",
                }}
              >
                No apartments found pull screen to fetch some apartments!
              </ThemedText>
            )}
            <FlatList
              ref={flatListRef}
              data={apartmentsListData?.data}
              keyExtractor={(item) => item?.id.toString()}
              renderItem={ItemView}
              refreshControl={
                <RefreshControl refreshing={isFetching} onRefresh={refetch} />
              }
              ListHeaderComponent={
                <ThemedView
                  style={{
                    backgroundColor: Colors.dark.mainColor,
                    margin: 10,
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  <Controller
                    control={control}
                    name={"ratings"}
                    render={({
                      field: { value, onChange, onBlur },
                      fieldState: { error },
                    }) => (
                      <TextInput
                        placeholder="filter by rating from 0.0 to 10.0 ⭐"
                        placeholderTextColor={Colors.dark.mainColor}
                        style={{
                          padding: 10,
                          margin: 10,
                          borderRadius: 10,
                          backgroundColor: "#fff",
                          borderColor: error
                            ? "#ff0000"
                            : Colors.dark.mainColor,
                          borderWidth: 1,
                        }}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                      />
                    )}
                  />

                  <ThemedView
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: 10,
                      backgroundColor: Colors.dark.mainColor,
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Controller
                      control={control}
                      name={"minPrice"}
                      render={({
                        field: { value, onChange, onBlur },
                        fieldState: { error },
                      }) => (
                        <ThemedView
                          style={{
                            backgroundColor: Colors.dark.mainColor,
                            flex: 1,
                          }}
                        >
                          <TextInput
                            placeholder="min price"
                            placeholderTextColor={Colors.dark.mainColor}
                            style={{
                              padding: 10,
                              borderRadius: 10,
                              backgroundColor: "#fff",
                              borderColor: error
                                ? "#ff0000"
                                : Colors.dark.mainColor,
                              borderWidth: 1,
                            }}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                          />
                        </ThemedView>
                      )}
                    />

                    <Ionicons name="arrow-forward" size={24} color={"#fff"} />

                    <Controller
                      control={control}
                      name={"maxPrice"}
                      render={({
                        field: { value, onChange, onBlur },
                        fieldState: { error },
                      }) => (
                        <ThemedView
                          style={{
                            backgroundColor: Colors.dark.mainColor,
                            flex: 1,
                          }}
                        >
                          <TextInput
                            placeholder="high price"
                            placeholderTextColor={Colors.dark.mainColor}
                            style={{
                              padding: 10,
                              margin: 10,
                              borderRadius: 10,
                              backgroundColor: "#fff",
                              borderColor: error
                                ? "#ff0000"
                                : Colors.dark.mainColor,
                              borderWidth: 1,
                            }}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                          />
                        </ThemedView>
                      )}
                    />
                  </ThemedView>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#fff",
                      padding: 10,
                      margin: 10,
                      borderRadius: 10,
                      alignItems: "center",
                    }}
                    onPress={handleSubmit(onSubmitHandler)}
                  >
                    <ThemedText
                      type="defaultSemiBold"
                      style={{ color: Colors.dark.mainColor }}
                    >
                      Apply Filters
                    </ThemedText>
                  </TouchableOpacity>
                </ThemedView>
              }
            />
          </ThemedView>
        )}
      </SafeAreaView>
    </ThemedView>
  );
};

export default HomeApartmentScreen;

const styles = StyleSheet.create({
  listContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});
