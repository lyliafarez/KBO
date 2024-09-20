
import React, { useState } from 'react';
import { TextInput, Button, View, StyleSheet  } from 'react-native';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // Si la requête est vide, on ne fait rien
    if (query.trim() === '') return;
    onSearch(query); 
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by name or company number"
        value={query}
        onChangeText={(text) => setQuery(text)}
      />
      <Button title="Research" onPress={handleSearch} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20, 
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 10, 
  },
  buttonContainer: {
    borderRadius: 10, 
    overflow: 'hidden', 
    
  },
});
export default SearchBar;

