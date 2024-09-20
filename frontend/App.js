import React, { useContext } from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import UserScreen from './src/screens/UserScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import EnterpriseDetailsScreen from './src/screens/EnterpriseDetailsScreen';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import { View } from 'react-native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Logout = ({ navigation }) => {
  const { logout } = useContext(AuthContext);
  
  React.useEffect(() => {
    logout();
    navigation.navigate('Home');
  }, []);

  return <View />;
};

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="EnterpriseDetails" component={EnterpriseDetailsScreen} />
  </Stack.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={HomeStack} />
    <Drawer.Screen name="My Profile" component={UserScreen} />
    <Drawer.Screen name="Logout" component={Logout} />
  </Drawer.Navigator>
);

const AuthDrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={HomeStack} />
    <Drawer.Screen name="My Profile" component={UserScreen} />
    <Drawer.Screen name="Login" component={LoginScreen} />
    <Drawer.Screen name="Register" component={RegisterScreen} />
  </Drawer.Navigator>
);

const App = () => {
  const { authState } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {authState.user ? <DrawerNavigator /> : <AuthDrawerNavigator />}
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