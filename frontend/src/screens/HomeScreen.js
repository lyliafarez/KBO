import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Pressable, Animated, Dimensions } from 'react-native';
import AdvanceSearchDrawer from '../Components/AdvanceSearchDrawer'; 
import ListResult from '../Components/ListResult'; 

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDrawer, setShowDrawer] = useState(false); 
  const [data, setData] = useState([]);
  const [hasResults, setHasResults] = useState(false);

  const [slideAnim] = useState(new Animated.Value(height)); // Initial value (height of the screen)

  const handleSearch = () => {
    console.log('Search query:', searchQuery);
    const results = []; // Replace with actual search logic
    setData(results);
    setHasResults(results.length > 0);

    // Slide up animation
    Animated.timing(slideAnim, {
      toValue: height * 0.42, // Target value (height of screen - 58%)
      duration: 300, // Duration of animation
      useNativeDriver: true, // Use native driver for performance
    }).start();
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
      <Animated.View style={[styles.listContainer, { transform: [{ translateY: slideAnim }] }]}>
        {hasResults && (
          <>
            <View style={styles.topContainer}>
              <Text style={styles.resultsCount}>100 results</Text>
              <View style={styles.paginationContainer}>
                <Pressable style={styles.paginationButton}>
                  <Text style={styles.paginationText}>Prev</Text>
                </Pressable>
                <Pressable style={styles.paginationButton}>
                  <Text style={styles.paginationText}>Next</Text>
                </Pressable>
              </View>
            </View>
            <ListResult 
              data={data} 
              renderItem={renderItem}
            />
          </>
        )}
      </Animated.View>
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
    position: 'absolute', 
    bottom: 0, // Start at the bottom of the screen
    height: height * 0.98, // Fixed height initially
    flexDirection: 'column',
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
});

export default HomeScreen;
