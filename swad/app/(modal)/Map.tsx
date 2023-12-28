import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import MapView from "react-native-maps";
import Colors from "../../constants/Colors";
import { useNavigation } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";

const Location = () => {
  const navigation = useNavigation();

  const [Location, setLocation] = useState({
    latitude: 26.2196,
    longitude: 84.3561,

    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const key = "AIzaSyCdL7y1FfY6qm7vxd03AKMiGGUW28EXN9s";
  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Search or move the map"
        onPress={(data, details) => {
          const point = details?.geometry?.location;
          if (!point) return;
          setLocation({
            ...Location,
            latitude: point.lat,
            longitude: point.lng,
          });
        }}
        query={{
          key: key,
          language: "en",
        }}
        renderLeftButton={() => (
          <View style={styles.searchIcon}>
          <TouchableOpacity>
            <Ionicons
              name="search-outline"
              size={20}
              color={Colors.mediumDark}
            /> 
            </TouchableOpacity>
          </View>
        )}
        styles={{
          container: {
            flex: 0,
          },
          textInput: {
            backgroundColor: Colors.lightGrey,
            paddingLeft: 30,
            borderRadius: 10,
          },
          textInputContainer: {
            backgroundColor: "#fff",
            padding: 8,
          },
        }}
      />
      <MapView style={styles.map} showsUserLocation={true} region={Location} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  button: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 20,
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  searchIcon: {
    position: "absolute",
    left: 15,
    zIndex : 1,
    top : 18,
     backgroundColor : Colors.lightGrey
  },
});
