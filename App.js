import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { StyleSheet} from 'react-native';
import { Provider } from 'react-redux';
import { store } from './Store';
import Homescren from './Screen/Homescren';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Maps from './Screen/Maps';
import NavigateCard from './compo/NavigateCard';










export default function App() {
  const Stack=createNativeStackNavigator();
  return (

 

 <Provider store={store}>
  <NavigationContainer>

  <SafeAreaProvider>
    <KeyboardAvoidingView style={{flex:1}}
    keyboardVerticalOffset={Platform.OS==='android' ? -64:0}
    behavior={Platform.OS==='android'? "padding":"height"}>
      
    <Stack.Navigator>
  <Stack.Screen 
  name='Homescren'
  component={Homescren}
  options={{
    headerShown:false,
  }}
  />
<Stack.Screen
name='MapScreen'
component={Maps}
options={{
  headerShown:false,
}}
/>

</Stack.Navigator>

    </KeyboardAvoidingView>

  </SafeAreaProvider>

  </NavigationContainer>
  
 </Provider>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
