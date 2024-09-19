import React, { useContext, useEffect } from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import UserScreen from './src/screens/UserScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { AuthProvider, AuthContext } from './src/context/AuthContext'; // Import AuthProvider and AuthContext
import { Button, View } from 'react-native';
const Drawer = createDrawerNavigator();


const Logout = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  
  // Call the logout function when this screen is rendered
  React.useEffect(() => {
    logout();
    navigation.navigate('Home'); // Redirect to Login screen after logout
  }, []);

  return (
    <View />
  );
};


const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="My Profile" component={UserScreen} />
    <Drawer.Screen name="Logout" component={Logout} />
  </Drawer.Navigator>
);

const App = () => {
  const { authState } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {authState.user ? (
        <DrawerNavigator /> // Show this if user is logged in
      ) : (
        <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="My Profile" component={UserScreen} />
    <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Register" component={RegisterScreen} />
  </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
};

export default function MainApp() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
