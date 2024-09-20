import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import SearchBar from '../Components/SearchBar';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Pressable, Dimensions, FlatList, Modal, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';


const HomeScreen = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasResults, setHasResults] = useState(false);
  const { authState } = useContext(AuthContext);
   const [userId, setUserId] = useState(null);
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
   const navigation = useNavigation();
   const [selectedFilters, setSelectedFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const resultsPerPage = 100;
  
  
   useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserId(user._id);
      fetchFavorites(user._id);
    }
  }, []);
  

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
  
  
   const toggleFilter = (filter) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter(f => f !== filter);
      } else {
        return [...prevFilters, filter];
      }
    });
  };
  
   const handleSearch = async (query) => {
    setIsLoading(true);
    try {
      const filtersQueryString = selectedFilters.join(',');
      const response = await axios.get(`http://localhost:5000/api/search?query=${query}&filters=${filtersQueryString}`);
      let data = response.data;
      setResults(data);
      setHasResults(data.length > 0);
      setCurrentPage(1);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      setResults([]);
      setHasResults(false);
    } finally {
      setIsLoading(false);
    }
  };
  
 

  
   const toggleAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch);

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


  /* const renderItem = ({ item }) => {
    
     const isFavorite = favorites.some(fav => fav.idEntreprise === item._id);
    const isAuthenticated = authState?.isAuthenticated;
    
    return (
      <View style={styles.item}>
        <View>
          <Text style={styles.itemTitle}>Enterprise name: {item.FirstDenomination}</Text>
      <Text style={styles.itemText}>Enterprise Number: {item.EnterpriseNumber}</Text>
      <Text style={styles.itemText}>Status: {item.Status || 'Status unavailable'}</Text>
        </View>
        <Pressable
          style={styles.voirButton}
          onPress={() => {
            console.log("Voir button pressed for:", item.EnterpriseNumber);
            navigation.navigate('EnterpriseDetails', {
                enterpriseNumber: item.EnterpriseNumber 
            });
            console.log("After navigation call");
          }}
        >
          <Text style={styles.voirButtonText}>Voir</Text>
        </Pressable>
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
  }; */

  const renderItem = ({ item }) => {
    const isFavorite = favorites.some(fav => fav.idEntreprise === item._id);
    const isAuthenticated = authState?.isAuthenticated;
  
    return (
      <View style={styles.item}>
        <View style={styles.itemContent}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitle}>{item.FirstDenomination}</Text>
            <Text style={styles.itemText}>{item.EnterpriseNumber}</Text>
            <Text style={styles.itemStatus}>{item.Status || 'Status unavailable'}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.voirButton}
              onPress={() => {
                console.log("Voir button pressed for:", item.EnterpriseNumber);
                navigation.navigate('EnterpriseDetails', {
                  enterpriseNumber: item.EnterpriseNumber 
                });
                console.log("After navigation call");
              }}
            >
              <Text style={styles.voirButtonText}>View Details</Text>
            </Pressable>
            {isAuthenticated && (
              <Pressable
                style={[styles.favoriteButton, isFavorite && styles.removeButton]}
                onPress={() => toggleFavorite(item)}
              >
                <Text style={styles.favoriteButtonText}>
                  {isFavorite ? 'Remove' : 'Favorite'}
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    );
  }


return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <Text style={styles.header}>Search for information on companies</Text>
        <View style={styles.searchContainer}>
          <View style={styles.searchBarContainer}>
            <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Find enterprise by number, denomination, activity, zip code"
              onChangeText={setSearchQuery}
              value={searchQuery}
            />
          </View>
          <Pressable style={styles.searchButton} onPress={() => handleSearch(searchQuery)}>
            <Text style={styles.buttonText}>Search</Text>
          </Pressable>
          <Pressable style={styles.uploadButton} >
            <Icon name="upload" size={20} color="#fff" />
          </Pressable>
        </View>

        <Pressable onPress={toggleAdvancedSearch} style={styles.advancedSearchButton}>
          <Text style={styles.advanceSearchText}>
            {showAdvancedSearch ? 'Hide Advanced Search' : 'Show Advanced Search'}
          </Text>
          <Icon name={showAdvancedSearch ? 'chevron-up' : 'chevron-down'} size={16} color="#007AFF" />
        </Pressable>

        {showAdvancedSearch && (
          <View style={styles.filtersContainer}>
            <Pressable 
              style={[styles.filterButton, selectedFilters.includes('enterprise_number') && styles.activeFilterButton]}
              onPress={() => toggleFilter('enterprise_number')}
            >
              <Text style={styles.filterButtonText}>Enterprise Number</Text>
            </Pressable>
            <Pressable 
              style={[styles.filterButton, selectedFilters.includes('denomination') && styles.activeFilterButton]}
              onPress={() => toggleFilter('denomination')}
            >
              <Text style={styles.filterButtonText}>Denomination</Text>
            </Pressable>
            <Pressable 
              style={[styles.filterButton, selectedFilters.includes('activity') && styles.activeFilterButton]}
              onPress={() => toggleFilter('activity')}
            >
              <Text style={styles.filterButtonText}>Activity</Text>
            </Pressable>
            <Pressable 
              style={[styles.filterButton, selectedFilters.includes('address') && styles.activeFilterButton]}
              onPress={() => toggleFilter('address')}
            >
              <Text style={styles.filterButtonText}>Zip code</Text>
            </Pressable>
          </View>
        )}
      </View>
      
      <View style={styles.listContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.resultsCount}>
            {results.length} results
          </Text>
          <View style={styles.paginationContainer}>
            <Pressable 
              style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}
              onPress={handlePrevPage}
              disabled={currentPage === 1}
            >
              <Text style={styles.paginationText}>Prev</Text>
            </Pressable>
            <Text style={styles.paginationText}>
              {currentPage}/{totalPages}
            </Text>
            <Pressable 
              style={[styles.paginationButton, currentPage === totalPages && styles.disabledButton]}
              onPress={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <Text style={styles.paginationText}>Next</Text>
            </Pressable>
          </View>
        </View>

        {hasResults ? (
          <FlatList 
            data={getPaginatedResults()} 
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()}
          />
        ) : (
          <Text style={styles.noResultsText}>No results found</Text>
        )}
      </View>

      <Modal
        transparent={true}
        animationType="fade"
        visible={isLoading}
      >
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Searching...</Text>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  outerContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBarContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 10,
  },
  uploadButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 25,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  advancedSearchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  advanceSearchText: {
    color: '#007AFF',
    fontSize: 16,
    marginRight: 5,
  },
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 8,
    minWidth: '48%',
    alignItems: 'center',
  },
  activeFilterButton: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    color: '#333',
    fontSize: 14,
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  resultsCount: {
    fontSize: 16,
    color: '#333333',
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paginationButton: {
    backgroundColor: '#007AFF',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  paginationText: {
    color: 'black',
    fontSize: 14,
  },
  itemSubtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#444',
  },
  itemListText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    marginBottom: 2,
  },
  noResultsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  activityIndicatorWrapper: {
    backgroundColor: 'white',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  itemInfo: {
    flex: 1,
    marginRight: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  itemText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  itemStatus: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4CAF50',
    marginTop: 4,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  voirButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginBottom: 8,
  },
  voirButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  favoriteButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  removeButton: {
    backgroundColor: '#FF3B30',
  },
  favoriteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

});



  

export default HomeScreen;
