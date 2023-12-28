import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import Categories from "../components/Categories";
import Resturants from "../components/Resturants";
import Colors from "../constants/Colors";

const index = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Categories />
        <Text  style={styles.header}>Top contender near your neighbour</Text>
        <Resturants />
        <Text  style={styles.header}>Offers near your</Text>
        <Resturants />
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: Colors.lightGrey,
    top: 125,
    width : "100%"
  },
  header : {
    fontWeight : "bold",
    fontSize :20,
    color :"#000"
  }
});
