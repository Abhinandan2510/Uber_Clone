import { SafeAreaView, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import tw from 'twrnc'
import {GOOGLE_MAPS_APIKEY} from "@env"
import { useDispatch, useSelector } from 'react-redux'
import { setdestination } from '../slices/navSlice'
import { useNavigation } from '@react-navigation/native'
import NavFavourite from './NavFavourite'

import { Icon } from '@rneui/base'
import RideOptionsCard from './RideOptionsCard'


const NavigateCard = () => {
   
    const dispatch=useDispatch();
    const navigation =useNavigation();
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Text style={tw`py-5 text-xl text-center`}>NavigateCard</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
            <GooglePlacesAutocomplete
            placeholder='Where To ?'
            styles={toInputBoxStyles}
            enablePoweredByContainer={false}
            returnKeyType={"search"}
            minLength={2}
            fetchDetails={true}
            onPress={(data,details = null)=>{
                dispatch(setdestination({
                   location:details.geometry.location,
                   description:data.description,
 
                }))
                navigation.navigate('RideOptionsCard')

            
            }}
        
            query={{
                key:GOOGLE_MAPS_APIKEY,
                language:'en',
            }}
            nearbyPlacesAPI='GooglePlacesSearch'
            debounce={400}
            
            />

        </View>
        <NavFavourite/>
      </View>
    
      <View style={tw`flex-row justify-evenly py-2 mt-auto border-t border-gray-100`}>
      <TouchableOpacity
      onPress={()=>navigation.navigate(RideOptionsCard)}
      style={tw`flex flex-row bg-black w-24 px-4 py-3  rounded-full justify-center `}>
        <Icon name='car' type='font-awesome' color='white' size={16}/>
        <Text style={tw`text-white text-center  `}>Rides</Text>
      </TouchableOpacity>

      <TouchableOpacity
      style={tw`flex flex-row justify-between w-24 px-4 py-3 rounded-full`}>
        <Icon name='fast-food-outline' type='ionicon' color='black' size={16}/>
        <Text style={tw` text-center`}>Eats</Text>
      </TouchableOpacity> 
        
      </View>
      
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        paddingTop:20,
        flex:0,

    },
    textInput:{
        backgroundColor:"grey",
        borderRadius:0,
        fontSize:18,

    },
    textInputContainer:{
         paddingHorizontal:20,
         paddingBottom:0,

    }
})