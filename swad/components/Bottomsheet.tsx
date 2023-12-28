import { View, Text, Button, StyleSheet } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export type Ref = BottomSheetModal;

const Bottomsheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["50%"], []);
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  const { dismiss } = useBottomSheetModal();

  return (
    <BottomSheetModal
      backgroundStyle={{ backgroundColor: Colors.lightGrey, borderRadius: 0 }}
      snapPoints={snapPoints}
      ref={ref}
      overDragResistanceFactor={0}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.container}>
        <View style={styles.toggle}>
          <TouchableOpacity style={styles.active}>
            <Text style={styles.activeText}>Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.inactive}>
            <Text style={styles.inactiveText}>Pickup</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.semiHeader}>Your Location</Text>
        <Link href={'/(modal)/Map'} asChild >
          <TouchableOpacity style={styles.semiheaderContainer}  onPress={()=> dismiss()}>
            <Ionicons
              name="location-outline"
              size={25}
              color={Colors.primary}
            />
            <Text style={{ flex: 1 }}>Current Location</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.primary}
            ></Ionicons>
          </TouchableOpacity>
        </Link>

        <Text style={styles.semiHeader}>Arrival Time</Text>

        <Link href={"/"} asChild>
          <TouchableOpacity style={styles.semiheaderContainer}>
            <Ionicons
              name="stopwatch-outline"
              size={25}
              color={Colors.primary}
            />
            <Text style={{ flex: 1 }}>Now</Text>
            <Ionicons
              name="chevron-forward"
              size={20}
              color={Colors.primary}
            ></Ionicons>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity onPress={() => dismiss()} style={styles.button}>
          <Text style={styles.buttontext}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
});

export default Bottomsheet;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    margin: 16,
    borderRadius: 4,

    justifyContent: "center",
    alignItems: "center",
  },
  buttontext: {
    fontWeight: "bold",
    color: "#fff",
  },
  container: {
    flex: 1,
    gap : 15
  },

  toggle: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 20,
  },
  active: {
    backgroundColor: Colors.primary,
    padding: 7,
    borderRadius: 32,
    paddingHorizontal: 30,
  },

  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },

  inactive: {
    padding: 7,
    borderRadius: 32,
    paddingHorizontal: 30,
  },

  inactiveText: {
    fontWeight: "bold",
    color: Colors.primary,
  },

  semiHeader: {
    fontSize: 20,
    fontWeight: "800",
    marginLeft: 20,
  },
  semiheaderContainer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    padding : 10,
    borderColor : '#bbb',
    borderWidth : 1,
    backgroundColor : '#fff',
    gap : 10
  },
});
