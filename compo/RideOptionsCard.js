import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import NavigateCard from './NavigateCard';
import { useSelector } from 'react-redux';
import { selecttravelTimeInformation } from '../slices/navSlice';

// Ride data array
const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-X-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-X-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

const Surge_Charge_Rate=1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInformation=useSelector(selecttravelTimeInformation)

  console.log(travelTimeInformation);
  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      {/* Header */}
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate(NavigateCard)}
          style={tw`absolute top-3 left-5 p-3 rounded-full`}>
          <Icon name='chevron-left' type='font-awesome' />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>Select a Ride -{travelTimeInformation ?.distance.text}</Text>
      </View>

      {/* Ride Options List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex flex-row justify-between items-center px-10 ${item.id === selected?.id && 'bg-gray-200'}`}>
            <Image
              style={styles.image}
              source={{ uri: item.image }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
              <Text>{travelTimeInformation?.duration.text} Travel Time</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat('en-IN',{
                style:'currency',
                currency:'INR',
              }).format(
                (travelTimeInformation?.duration.value *Surge_Charge_Rate * item.multiplier)/10
              )}

            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Confirm Button */}
      <View style={styles.confirmButtonContainer}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}>
          <Text style={tw`text-center text-white text-xl`}>Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  confirmButtonContainer: {
    marginTop: 'auto',
  },
});

export default RideOptionsCard;
