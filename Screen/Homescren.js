import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import tw from 'twrnc';  // Tailwind utility for React Native styling
import Navopt from '../compo/Navopt';  // Custom component for navigation options
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";  // Get your Google Maps API Key from environment
import { setorigin, setdestination } from '../slices/navSlice';  // Redux slices for state management
import { useDispatch } from 'react-redux';  // Redux dispatch hook
import NavFavourite from '../compo/NavFavourite';  // Custom component for favorite locations

const Homescreen = () => {
  const dispatch = useDispatch();

  // Render the main Homescreen component
  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <View style={tw`p-5`}>
        {/* Uber logo */}
        <Image
          style={styles.logo}
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1024px-Uber_logo_2018.svg.png"
          }}
        />

        {/* Google Places Autocomplete input */}
        <GooglePlacesAutocomplete
          placeholder="Where From?"
          styles={{
            container: { flex: 0 },
            textInput: styles.textInput,
          }}
          onPress={(data, details = null) => {
            if (details) {
              // Set origin using the selected place
              dispatch(setorigin({
                location: details.geometry.location,
                description: data.description,
              }));
              // Clear destination when selecting new origin
              dispatch(setdestination(null));
            }
          }}
          fetchDetails={true}
          returnKeyType={"search"}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={200}
          onFail={(error) => console.error("Error: ", error)} // Error handling
        />

        {/* Navigation options component */}
        <Navopt />

        {/* Favorite destinations component */}
        <NavFavourite />
      </View>
    </SafeAreaView>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  textInput: {
    fontSize: 18,
  },
});
