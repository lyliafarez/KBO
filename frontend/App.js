import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, SafeAreaView, FlatList, Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './src/screens/HomeScreen';
import UserScreen from './src/screens/UserScreen';
import AuthScreen from './src/screens/AuthScreen';
import SearchBar from './components/SearchBar';


const Drawer = createDrawerNavigator();

export default function App() {
  const [results, setResults] = useState([]);

  const handleSearchResults = (data) => {
    setResults(data); 
  };

  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text>Nom : {item.Denomination || 'Nom indisponible'}</Text>
      <Text>Numéro d'entreprise : {item.EntityNumber || item.EnterpriseNumber}</Text>
      <Text>Status : {item.Status || 'Statut indisponible'}</Text>
    </View>
  );
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="My Profile" component={UserScreen} />
        <Drawer.Screen name="Authentification" component={AuthScreen} />
      </Drawer.Navigator>

      <SafeAreaView style={{ padding: 20 }}>
        <SearchBar onSearch={handleSearchResults} />
        <FlatList
          data={results}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderItem}
        />
      </SafeAreaView>

    </NavigationContainer>

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
