import React from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import Customheader from "../components/CustomHeader";
import { Stack, useNavigation } from "expo-router";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayoutNav() {
  const navigation = useNavigation();
  return (
    <BottomSheetModalProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => <Customheader />,
          }}
        />
        <Stack.Screen
          name="(modal)/filter"
          options={{
            presentation: "modal",
            headerTitle: "Filter",
            headerStyle: {
              backgroundColor: Colors.lightGrey,
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Ionicons
                  name="close-outline"
                  size={28}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="(modal)/Map"
          options={{
            presentation: "fullScreenModal",
            headerTitle: "select-location",
            headerStyle: {
              backgroundColor: Colors.lightGrey,
            },
            headerRight: () => (
              <TouchableOpacity>
                <Ionicons
                  name="close-outline"
                  size={30}
                  color={Colors.primary}
                />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </BottomSheetModalProvider>
  );
}
