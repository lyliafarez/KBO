import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Pressable, Dimensions, FlatList } from 'react-native';
import AdvanceSearchDrawer from '../Components/AdvanceSearchDrawer'; 
import ListResult from '../Components/ListResult'; 

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDrawer, setShowDrawer] = useState(false); 
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [hasResults, setHasResults] = useState(false);
  
  const resultsPerPage = 5; // Number of results per page

  const handleSearch = () => {
    console.log('Search query:', searchQuery);
    const results = Array.from({ length: Math.floor(Math.random() * 50) + 1 }, (_, index) => ({
      id: index,
      name: `Company ${index + 1}`,
    })); // Simulate search logic with random number of results
    setData(results);
    setHasResults(results.length > 0);
    setCurrentPage(1); // Reset to the first page on each new search
  };

  const handleUploadCSV = () => {
    console.log('Upload CSV button pressed');
  };

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer); 
  };

  const searchByName = (name) => {
    console.log('Search by company name:', name);
  };

  const searchByNumber = (number) => {
    console.log('Search by company number:', number);
  };

  const searchByActivity = (activity) => {
    console.log('Search by activity:', activity);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / resultsPerPage);

  // Get results for the current page
  const getPaginatedResults = () => {
    const startIndex = (currentPage - 1) * resultsPerPage;
    return data.slice(startIndex, startIndex + resultsPerPage);
  };

  // Handle page navigation
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <Text style={styles.header}>Search for information on companies</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Enter company name or keyword"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Pressable style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.buttonTextSearch}>Search</Text>
          </Pressable>
          <Pressable style={styles.uploadButton} onPress={handleUploadCSV}>
            <Text style={styles.buttonText}>Upload CSV</Text>
          </Pressable>
        </View>
        <Pressable onPress={toggleDrawer}>
          <Text style={styles.advanceSearchText}>Advance research</Text>
        </Pressable>
        <AdvanceSearchDrawer
          isVisible={showDrawer} 
          onSearchByName={searchByName}
          onSearchByNumber={searchByNumber}
          onSearchByActivity={searchByActivity} 
        />
      </View>
      
      {/* The white background area for search results */}
      <View style={styles.listContainer}>
        <View style={styles.topContainer}>
          <Text style={styles.resultsCount}>
            {data.length} results
          </Text>
          <View style={styles.paginationContainer}>
            <Pressable 
              style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}
              onPress={handlePrevPage}
              disabled={currentPage === 1} // Disable if on first page
            >
              <Text style={styles.paginationText}>Prev</Text>
            </Pressable>
            <Text style={styles.paginationText}>
              {currentPage}/{totalPages}
            </Text>
            <Pressable 
              style={[styles.paginationButton, currentPage === totalPages && styles.disabledButton]}
              onPress={handleNextPage}
              disabled={currentPage === totalPages} // Disable if on last page
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
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <Text style={styles.noResultsText}>No results found</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

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
});

export default HomeScreen;
