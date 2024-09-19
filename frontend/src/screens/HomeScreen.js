import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { View, Text, StyleSheet, SafeAreaView, Pressable, FlatList, Modal, ActivityIndicator, Dimensions} from 'react-native';
//import { View, Text, Button, StyleSheet, SafeAreaView, TextInput, Pressable, Dimensions, FlatList } from 'react-native';
import ListResult from '../Components/ListResult'; 
import SearchBar from '../Components/SearchBar';
import axios from 'axios';

const HomeScreen = () => {
  const [showDrawer, setShowDrawer] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
  const [hasResults, setHasResults] = useState(false);
  const { authState, logout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  // search
  const [results, setResults] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]); // State for selected filters

  useEffect(() => {
    console.log('Auth state changed:', authState);
  }, [authState]);

  const resultsPerPage = 100; // Number of results per page

  const toggleFilter = (filter) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter(f => f !== filter); // Remove filter if it's already selected
      } else {
        return [...prevFilters, filter]; // Add filter if it's not selected
      }
    });
  };

  const handleSearch = async (query) => {
    setIsLoading(true); // Show the modal
    try {
      const filtersQueryString = selectedFilters.join(',');
      const response = await axios.get(`http://localhost:5000/api/search?query=${query}&filters=${filtersQueryString}`);
      let data = response.data;
  
      console.log('Résultats de la recherche===>', data);
      setResults(data);
      setHasResults(data.length > 0);
      setCurrentPage(1);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      setResults([]);
      setHasResults(false);
    } finally {
      setIsLoading(false); // Hide the modal
    }
  };

  const handleUploadCSV = () => {
    console.log('Upload CSV button pressed');
  };

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer); 
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(results.length / resultsPerPage);

  // Get results for the current page
  const getPaginatedResults = () => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    return results.slice(startIndex, startIndex + resultsPerPage);
  };

  // Handle page navigation
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemTitle}>Enterprise Number: {item.EnterpriseNumber}</Text>
      <Text style={styles.itemText}>Status: {item.Status || 'Status unavailable'}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <Text style={styles.header}>Search for information on companies</Text>
        <View style={styles.searchContainer}>
          <SearchBar onSearch={handleSearch} />
          <Pressable style={styles.uploadButton} onPress={handleUploadCSV}>
            <Text style={styles.buttonText}>Upload CSV</Text>
          </Pressable>
        </View>

        {/* Filter Buttons */}
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
            <Text style={styles.filterButtonText}>Address</Text>
          </Pressable>
        </View>

        <Pressable onPress={toggleDrawer}>
          <Text style={styles.advanceSearchText}>Advance research</Text>
        </Pressable>
      </View>
      
      {/* The white background area for search results */}
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

        {/* Render the search results or a message if no results */}
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
    height: height * 0.58, // Fixed height to always cover 58% of the screen
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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  item: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    marginVertical: 8,
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemText: {
    fontSize: 16,
  },
  noResultsText: {
    textAlign: 'center',
    fontSize: 18,
    fontStyle: 'italic',
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFD20A',
    marginHorizontal: 5,
  },
  activeFilterButton: {
    backgroundColor: '#FFA500', // Highlight active filters
  },
  filterButtonText: {
    color: 'black',
  },
  disabledButton: {
    backgroundColor: '#e0e0e0',
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
});

export default HomeScreen;
