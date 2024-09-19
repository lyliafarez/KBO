// import React, { useState } from 'react';
// import { TextInput, Button, View } from 'react-native';
// import axios from 'axios';

// const SearchBar = ({ onSearch }) => {
//   const [query, setQuery] = useState('');

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/enterprises/');
//       onSearch(response.data); 
//     } catch (error) {
//       console.error('Erreur', error);
//       onSearch([]); 
//     }
//   };

//   return (
//     <View>
//       <TextInput
//         style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
//         placeholder="Rechercher par nom ou numéro d'entreprise"
//         value={query}
//         onChangeText={(text) => setQuery(text)}
//       />
//       <Button title="Rechercher" onPress={handleSearch} />
//     </View>
//   );
// };

// export default SearchBar;
// ****************************************************************************************
// import React, { useState } from 'react';
// import { TextInput, Button, View } from 'react-native';
// import axios from 'axios';

// const SearchBar = ({ onSearch }) => {
//   const [query, setQuery] = useState('');

//   const handleSearch = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/search?query=${query}`);
//       onSearch(response.data); 
//     } catch (error) {
//       console.error('Erreur', error);
//       onSearch([]); 
//     }
//   };

//   return (
//     <View>
//       <TextInput
//         style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
//         placeholder="Rechercher par nom ou numéro d'entreprise"
//         value={query}
//         onChangeText={(text) => setQuery(text)}
//       />
//       <Button title="Rechercher" onPress={handleSearch} />
//     </View>
//   );
// };

// export default SearchBar;


//*********************************************** */
import React, { useState } from 'react';
import { TextInput, Button, View } from 'react-native';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // Si la requête est vide, on ne fait rien
    if (query.trim() === '') return;

    onSearch(query); // Passe la recherche au composant parent
  };

  return (
    <View>
      <TextInput
        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
        placeholder="Rechercher par nom ou numéro d'entreprise"
        value={query}
        onChangeText={(text) => setQuery(text)}
      />
      <Button title="Rechercher" onPress={handleSearch} />
    </View>
  );
};

export default SearchBar;

