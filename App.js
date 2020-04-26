import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './screen/dashboard';
import CapitalWeather from './screen/CapitalWeather';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Login" component={Dashboard} options={{headerShown: false}}/>
        <Stack.Screen name="Capital Weather" component={CapitalWeather}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;