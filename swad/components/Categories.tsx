import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { categories } from "../assets/data/home";
import { ScrollView } from "react-native-gesture-handler";
import Colors from "../constants/Colors";

const Categories = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{padding : 16}}>
      {categories.map((item, index) => (
        <View style={styles.card} key={index}>
          <Image   source={item.img} />
          <Text style={styles.text}>{item.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize : 14,
    padding :3
  },
  card : {
    height : 100,
    width : 110,
    padding :5,
    backgroundColor: '#fff',
    marginEnd : 10,
    elevation : 2,
    shadowColor : "#000",
    shadowOffset : {
      width : 0,
      height : 4
    },
    shadowOpacity : 0.06,
    borderRadius : 4

  }
});
