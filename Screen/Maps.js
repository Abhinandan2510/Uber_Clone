import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc'
import Map from '../compo/Map'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import NavigateCard from '../compo/NavigateCard'
import RideOptionsCard from '../compo/RideOptionsCard'
import { Icon } from '@rneui/base'



const Maps = () => {
  const stack=createNativeStackNavigator();
  return (
    <View>
      <TouchableOpacity style={tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}>
<Icon
name='menu'/>
      </TouchableOpacity>
     
      <View style={tw`h-1/2`}>
      <Map/>
      </View>
      <View style={tw`h-1/2`}>
      <stack.Navigator>
      <stack.Screen
  name='NavigateCard'
  component={NavigateCard}
  options={{
    headerShown:false,
  }}
  />
  <stack.Screen
  name='RideOptionsCard'
  component={RideOptionsCard}
  options={{
    headerShown:false,
  }}
  
  
  />


        
      </stack.Navigator>
     
 
      </View>
      

      

    </View>
  )
}

export default Maps

const styles = StyleSheet.create({})