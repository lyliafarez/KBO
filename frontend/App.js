import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import SearchBar from './components/SearchBar';
import axios from 'axios';

const App = () => {
  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/search?query=${query}`);
      let data = [];

      if (Array.isArray(response.data)) {
        data = response.data;
      } else if (response.data.enterprise && response.data.denomination) {
        data = [{
          _id: response.data.enterprise._id,
          Denomination: response.data.denomination.Denomination || 'Nom indisponible',
          EnterpriseNumber: response.data.enterprise.EnterpriseNumber || 'Numéro indisponible',
          Status: response.data.enterprise.Status || 'Statut indisponible'
        }];
      }

      console.log('Résultats de la recherche===>', data);
      setResults(data);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      setResults([]);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Nom : {item.Denomination}</Text>
      <Text>Numéro d'entreprise : {item.EnterpriseNumber || 'Numéro indisponible'}</Text>
      <Text>Status : {item.Status || 'Statut indisponible'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />
      <FlatList
        data={results}
        keyExtractor={(item) => item._id.toString()} 
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default App;

