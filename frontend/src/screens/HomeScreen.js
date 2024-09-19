import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { View, Text, Button, StyleSheet, SafeAreaView, TextInput, Pressable, Dimensions, FlatList } from 'react-native';
import AdvanceSearchDrawer from '../components/AdvanceSearchDrawer'; 
import ListResult from '../components/ListResult'; 
import SearchBar from '../Components/SearchBar';
import axios from 'axios';

const HomeScreen = () => {
  const [showDrawer, setShowDrawer] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
  const [hasResults, setHasResults] = useState(false);
  const { authState, logout } = useContext(AuthContext);

  // search
  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log('Auth state changed:', authState);
  }, [authState]);

  const resultsPerPage = 5; // Number of results per page

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
      setHasResults(data.length > 0);
      setCurrentPage(1); // Reset to first page when new search is performed
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      setResults([]);
      setHasResults(false);
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
    <Text style={styles.itemTitle}>Nom : {item.Denomination}</Text>
    <Text style={styles.itemText}>Numéro d'entreprise : {item.EnterpriseNumber || 'Numéro indisponible'}</Text>
    <Text style={styles.itemText}>Status : {item.Status || 'Statut indisponible'}</Text>
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
  item:{
    backgroundColor:'#f9f9f9', // Light grey background for items
    paddingVertical:10,
    paddingHorizontal:15,
    borderRadius:5,
    marginVertical:5,
    borderWidth:1,
    borderColor:'#dddddd'
 },
 itemTitle:{
    fontSize:18,
    fontWeight:'bold',
 },
 itemText:{
    fontSize:14,
    color:'#666666'
 },
});

export default HomeScreen;
