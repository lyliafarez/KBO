import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { View, Text, Pressable, StyleSheet, SafeAreaView, FlatList, Dimensions } from 'react-native';
import SearchBar from '../Components/SearchBar';
import axios from 'axios';

const HomeScreen = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasResults, setHasResults] = useState(false);
  const { authState } = useContext(AuthContext);
  const [userId, setUserId] = useState(null);
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserId(user._id);
      fetchFavorites(user._id);
    }
  }, []);

  const resultsPerPage = 5;

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/search?query=${query}`);
      let data = Array.isArray(response.data) ? response.data : [{
        _id: response.data.enterprise._id,
        Denomination: response.data.denomination.Denomination || 'Nom indisponible',
        EnterpriseNumber: response.data.enterprise.EnterpriseNumber || 'Numéro indisponible',
        Status: response.data.enterprise.Status || 'Statut indisponible'
      }];
      setResults(data);
      setHasResults(data.length > 0);
      setCurrentPage(1);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      setResults([]);
      setHasResults(false);
    }
  };

  const fetchFavorites = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/favorites`, {
        params: { idUser: id }
      });
      setFavorites(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des favoris:', error);
    }
  };

  const toggleFavorite = async (item) => {
    if (!authState?.isAuthenticated) {
      console.log('User is not authenticated');
      return;
    }
  
    try {
      const favorite = favorites.find(fav => fav.idEntreprise === item._id);
      const isFavorite = !!favorite;
  
      if (isFavorite) {
        await axios.delete(`http://localhost:5000/api/favorites/${favorite._id}`);
        setFavorites(favorites.filter(fav => fav._id !== favorite._id));
      } else {
        const response = await axios.post('http://localhost:5000/api/favorites', {
          idUser: authState.user._id,
          idEntreprise: item._id
        });
        setFavorites([...favorites, { _id: response.data._id, idEntreprise: item._id }]);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout ou de la suppression des favoris:', error);
    }
  };
  

  const totalPages = Math.ceil(results.length / resultsPerPage);

  const getPaginatedResults = () => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    return results.slice(startIndex, startIndex + resultsPerPage);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const renderItem = ({ item }) => {
    const isFavorite = favorites.some(fav => fav.idEntreprise === item._id);
    const isAuthenticated = authState?.isAuthenticated;
  
    return (
      <View style={styles.item}>
        <Text style={styles.itemTitle}>Nom : {item.Denomination}</Text>
        <Text style={styles.itemText}>Numéro d'entreprise : {item.EnterpriseNumber || 'Numéro indisponible'}</Text>
        <Text style={styles.itemText}>Status : {item.Status || 'Statut indisponible'}</Text>
  
        {isAuthenticated && (
          <Pressable
            style={isFavorite ? styles.removeButton : styles.favoriteButton}
            onPress={() => toggleFavorite(item)}
          >
            <Text style={styles.favoriteButtonText}>
              {isFavorite ? 'Retirer des favoris' : 'Ajouter au favoris'}
            </Text>
          </Pressable>
        )}
      </View>
    );
  };
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <Text style={styles.header}>Search for information on companies</Text>
        <View style={styles.searchContainer}>
          <SearchBar onSearch={handleSearch} />
          <Pressable style={styles.uploadButton} onPress={() => console.log('Upload CSV button pressed')}>
            <Text style={styles.buttonText}>Upload CSV</Text>
          </Pressable>
        </View>
        <Pressable onPress={() => setShowDrawer(!showDrawer)}>
          <Text style={styles.advanceSearchText}>Advance research</Text>
        </Pressable>
      </View>

      <View style={styles.listContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.resultsCount}>{results.length} results</Text>
          <View style={styles.paginationContainer}>
            <Pressable style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]} onPress={handlePrevPage} disabled={currentPage === 1}>
              <Text style={styles.paginationText}>Prev</Text>
            </Pressable>
            <Text style={styles.paginationText}>{currentPage}/{totalPages}</Text>
            <Pressable style={[styles.paginationButton, currentPage === totalPages && styles.disabledButton]} onPress={handleNextPage} disabled={currentPage === totalPages}>
              <Text style={styles.paginationText}>Next</Text>
            </Pressable>
          </View>
        </View>

        {hasResults ? (
          <FlatList data={getPaginatedResults()} renderItem={renderItem} keyExtractor={(item) => item._id.toString()} />
        ) : (
          <Text style={styles.noResultsText}>No results found</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  listContainer: {
    backgroundColor: 'white',
    width: '100%',
    padding: 20,
    height: height * 0.58, 
    justifyContent: 'flex-start',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  resultsCount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paginationButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFD20A',
    marginHorizontal: 5,
  },
  paginationText: {
    color: 'black',
    fontSize: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  advanceSearchText: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButton: {
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFD20A',
  },
  uploadButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonTextSearch: {
    color: 'black',
    fontSize: 16,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  itemContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
  noResultsText: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  item: {
    backgroundColor: '#f9f9f9', 
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 14,
    color: '#666666',
  },
  favoriteButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#006400', 
    marginVertical: 10,
  },
  removeButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#C41E3A', 
    marginVertical: 10,
  },
  favoriteButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10, 
  },
  uploadButton: {
    width: 120, 
    height: 40, 
    borderRadius: 5,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});


export default HomeScreen;
