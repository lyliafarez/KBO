import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './src/screens/HomeScreen';
import UserScreen from './src/screens/UserScreen';
import AuthScreen from './src/screens/AuthScreen';


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="My Profile" component={UserScreen} />
        <Drawer.Screen name="Authentification" component={AuthScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
