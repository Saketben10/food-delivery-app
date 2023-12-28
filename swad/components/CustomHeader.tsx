import { View, Text, StyleSheet, Image } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import  { BottomSheetModal } from "@gorhom/bottom-sheet";
import Bottomsheet from "./Bottomsheet";
import { Link } from "expo-router";
 

const SearchBar = () => (
  <View style={styles.searchBar}>
    <View style={styles.searchContainer}>
      <View style={styles.search}>
      <TouchableOpacity>
  <Ionicons name="ios-search" size = {20} style = {styles.searchIcon}/>
  </TouchableOpacity>
        <TextInput style = {styles.inputtext} placeholder="Resturants , Places and Dishes" />
       
      </View>
      <Link href='/(modal)/filter'  >
      <TouchableOpacity style={styles.optionsButton}>
        <Ionicons name="options-outline" size={20} color={Colors.primary} />
      </TouchableOpacity>
      </Link>
    </View>
  </View>
);

const Customheader = () => {

const openModal = ()=>{
   bottomSheetRef.current?.present()
}

const bottomSheetRef = useRef<BottomSheetModal>(null);

 
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Bottomsheet ref = {bottomSheetRef }/>
      <View style={styles.container}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <TouchableOpacity onPress={openModal}>
            <Image
              source={require("../assets/images/bike-removebg-preview.png")}
              style={{ height: 60, width: 70 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={openModal}>
            <View>
              <Text style={styles.title}>Delivery - Now</Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Siwan , Bihar
                </Text>
                <Ionicons
                  name="chevron-down-outline"
                  size={20}
                  color={Colors.primary}
                />
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity style={styles.profile}>
          <Ionicons name="person-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <SearchBar />
    </SafeAreaView>
  );
};

export default Customheader;

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 150,
    justifyContent: "space-around",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    color: Colors.medium,
  },
  profile: {
    backgroundColor: Colors.lightGrey,
    padding: 15,
    borderRadius: 50,
  },
  searchBar: {
    height: 60,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 15,
    alignItems: "center",
    marginTop: 5,
  },
  searchIcon : {
color : Colors.medium,
padding : 7
  },
  search: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    borderRadius : 8,
    flexDirection : "row",
    alignItems : "center"
  },
  inputtext:{
    color : Colors.mediumDark,
    padding : 10
  },
  optionsButton: {},
});
