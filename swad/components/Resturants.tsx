import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { restaurants } from "../assets/data/home";
import { ScrollView } from "react-native-gesture-handler";
import { Link } from "expo-router";
import Colors from "../constants/Colors";

const Resturants = () => {
  return (
    <ScrollView
      horizontal
      style={[styles.container]}
      showsHorizontalScrollIndicator={false}
    >
      {restaurants.map((item, index) => (
        <Link href={"/"}   key={index} asChild>
          <TouchableOpacity >
            <View style={styles.card}>
              <Image
                source={item.img}
                alt="resturantImages"
                style={styles.image}
              />
              <View style={styles.categoryBox}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={{color : Colors.green}}>{item.rating}{item.ratings}</Text>
                <Text style={{color:Colors.mediumDark}}>{item.distance}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
};

export default Resturants;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
  },
  card: {
    padding: 5,
    height: 300,
    width: 310,

    backgroundColor: "#fff",
    marginEnd: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    borderRadius: 4,
  },
  image: {
    flex : 5,
    width : undefined,
    height : undefined
  },
  categoryBox: {
    flex: 2,
  },
  text: {
    fontWeight: "bold",
    fontSize : 14,
    paddingVertical : 5
  },
});
