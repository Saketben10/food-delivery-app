import React, { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";

import Colors from "../../constants/Colors";

// Import the JSON data
import categories from "../../assets/data/filter.json";
import { Ionicons } from "@expo/vector-icons";

// checkbox
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { transform } from "@babel/core";

interface Category {
  name: String;
  count: number;
  checked?: boolean;
}

// uper category component
const ItemBox = () => {
  return (
    <View>
      <TouchableOpacity style={styles.itemContainer}>
        <Ionicons name="arrow-down-outline" size={20} />
        <Text style={{ flex: 1 }}>Sort</Text>
        <Ionicons name="chevron-forward" size={25} color={Colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.itemContainer}>
        <Ionicons name="fast-food-outline" size={20} />
        <Text style={{ flex: 1 }}>Hiegene Routine</Text>
        <Ionicons name="chevron-forward" size={25} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemContainer}>
        <Ionicons name="pricetag-outline" size={20} />
        <Text style={{ flex: 1 }}>Offers</Text>
        <Ionicons name="chevron-forward" size={25} color={Colors.primary} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.itemContainer}>
        <Ionicons name="nutrition-outline" size={20} />
        <Text style={{ flex: 1 }}>Dietry</Text>
        <Ionicons name="chevron-forward" size={25} color={Colors.primary} />
      </TouchableOpacity>

      <Text style={{ fontWeight: "bold", padding: 20, fontSize: 15 }}>
        Categories
      </Text>
    </View>
  );
};
// actual component
const Filter = () => {
  const navigator = useNavigation(); // helps to navigate through pages
  const [items, setitems] = useState<Category[]>(categories); //list of items
  const [selected, setselected] = useState<Category[]>([]);
  const flexwidth = useSharedValue(0); // form ren reanimated
  const scale = useSharedValue(0);
  const flexbutton = useSharedValue(0);
 

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: flexwidth.value,
      opacity : flexwidth.value > 0 ? 1 : 0
    };
  });

  const animatedText = useAnimatedStyle(()=>{  
    return {
      transform : [{scale : scale.value}]
    }
  })

  const animatedbutton = useAnimatedStyle(()=>{
    return {
      width :flexbutton.value
    }
  })
 

  // clear all checkbox
  const clearall = () => {
    const updatedItems = items.map((item) => {
      item.checked = false;
      return item;
    });
    setitems(updatedItems);
  };

  // select all checkbox
  const selectAll = () => {
    setitems((currentstate) => {
      let updatedItems = currentstate.map((item) => {
        item.checked = true;
        return item;
      });
      return updatedItems;
    });
  };


  // logic to check whether anyone item has been selected or not 
  useEffect(() => {
    const hasSelected = selected.length > 0;

    const selecteditems = items.filter((item) => item.checked);
    const newSlected = selecteditems.length > 0;

    if (hasSelected !== newSlected) {
      flexwidth.value = withTiming(newSlected ? 185: 0); // animated the clear all button
      scale.value = withTiming(newSlected ?1 : 0); // animted the text of clear all button
      flexbutton.value = withTiming(newSlected? 185 : 370) // animated the done button based on checked item
 

    }
    setselected(selecteditems);
  }, [items]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={clearall}
          style={{ flexDirection: "row", padding: 15, gap: 5 }}
        >
          <Ionicons name="trash-bin-outline" color={"red"} size={25} />
          <Text style={{ fontWeight: "bold" }}>Clear all</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={selectAll}
          style={{ flexDirection: "row", padding: 15, gap: 5 }}
        >
          <Ionicons name="attach-outline" color="#6c5ce7" size={25} />
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>Select all</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items}
        ListHeaderComponent={<ItemBox />}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text style={styles.itemText}   onPress={() => { // logic for checking the boxes
                const isChecked = items[index].checked;

                setitems((currentstate) => {
                  const updatedItems = currentstate.map((item) => {
                    if (item.name === items[index].name) {
                      item.checked = !isChecked;
                    }
                    return item;
                  });
                  return updatedItems;
                });
              }} >
              {item.name}({item.count}){" "}
            </Text>
            <BouncyCheckbox // checkbox dependency
          
              isChecked={items[index].checked}
              disableBuiltInState
              size={25}
              fillColor={Colors.primary}
              unfillColor="#FFFFFF"
              iconStyle={{ borderColor: Colors.primary, borderRadius: 5 }}
              innerIconStyle={{ borderWidth: 2, borderRadius: 5 }}
              onPress={() => {
                const isChecked = items[index].checked;


                setitems((currentstate) => {
                  const updatedItems = currentstate.map((item) => {
                    if (item.name === items[index].name) {
                      item.checked = !isChecked;
                    }
                    return item;
                  });
                  return updatedItems;
                });
              }}
            />
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <Animated.View style={[animatedStyle, styles.outlineButton]}>
            <TouchableOpacity onPress={clearall}>
              <Animated.View  style = {animatedText }>
              <Text style={styles.clearbuttonText}>Clear all</Text>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style ={[animatedbutton, styles.footerButton]}>
          <TouchableOpacity
            
            onPress={() => {
              navigator.goBack();
            }}
          >  
        
            <Text style={styles.donebuttonText}>Done</Text>
            
          </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.lightGrey,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    height: 100,
    backgroundColor: "#fff",
    padding: 15,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    
  },

 
  footerButton: {
    backgroundColor: Colors.primary,
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
    width  :370,
    height : 56
  },
  
  outlineButton: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#6c5ce7",


      },


  clearbuttonText: {
    fontWeight: "bold",
    color: "#fff",
  },

  donebuttonText: {
    color: "#fff",
    fontWeight: "bold",
    flex : 1
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    gap: 10,
  },
  itemContainer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderColor: Colors.grey,
    borderWidth: 1,
    backgroundColor: "#fff",
    gap: 10,
  },
  itemText: {
    fontWeight: "500",
    flex: 1,
  },
});
