import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Modal, TextInput } from 'react-native';

const AdvanceSearchDrawer = ({ isVisible, onSearchByName, onSearchByNumber, onSearchByActivity }) => {
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [numberModalVisible, setNumberModalVisible] = useState(false);
  const [activityModalVisible, setActivityModalVisible] = useState(false);

  const [companyName, setCompanyName] = useState('');
  const [companyNumber, setCompanyNumber] = useState('');
  const [activity, setActivity] = useState('');

  const handleNameSearch = () => {
    onSearchByName(companyName);
    setNameModalVisible(false); // Close modal after search
  };

  const handleNumberSearch = () => {
    onSearchByNumber(companyNumber);
    setNumberModalVisible(false); // Close modal after search
  };

  const handleActivitySearch = () => {
    onSearchByActivity(activity);
    setActivityModalVisible(false); // Close modal after search
  };

  if (!isVisible) return null; // Don't render the drawer if it's not visible

  return (
    <View style={styles.drawerContainer}>
      {/* Pressable for Company Name */}
      <Pressable style={styles.drawerButton} onPress={() => setNameModalVisible(true)}>
        <Text style={styles.drawerButtonText}>By company name</Text>
      </Pressable>

      {/* Modal for Company Name */}
      <Modal visible={nameModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Enter company name"
              value={companyName}
              onChangeText={setCompanyName}
            />
            <View style={styles.modalButtonView}>
              <Pressable style={styles.modalButton} onPress={handleNameSearch}>
                <Text style={styles.modalButtonText}>Search</Text>
              </Pressable>
              <Pressable style={styles.modalButton} onPress={() => setNameModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Pressable for Company Number */}
      <Pressable style={[styles.drawerButton, styles.drawerButtonSpacing]} onPress={() => setNumberModalVisible(true)}>
        <Text style={styles.drawerButtonText}>By company number</Text>
      </Pressable>

      {/* Modal for Company Number */}
      <Modal visible={numberModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Enter company number"
              value={companyNumber}
              onChangeText={setCompanyNumber}
              keyboardType="numeric" // Use numeric keyboard for numbers
            />
            <View style={styles.modalButtonView}>
              <Pressable style={styles.modalButton} onPress={handleNumberSearch}>
                <Text style={styles.modalButtonText}>Search</Text>
              </Pressable>
              <Pressable style={styles.modalButton} onPress={() => setNumberModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Pressable for Activity */}
      <Pressable style={styles.drawerButton} onPress={() => setActivityModalVisible(true)}>
        <Text style={styles.drawerButtonText}>By activity</Text>
      </Pressable>

      {/* Modal for Activity */}
      <Modal visible={activityModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Enter activity"
              value={activity}
              onChangeText={setActivity}
            />
            <View style={styles.modalButtonView}>
              <Pressable style={styles.modalButton} onPress={handleActivitySearch}>
                <Text style={styles.modalButtonText}>Search</Text>
              </Pressable>
              <Pressable style={styles.modalButton} onPress={() => setActivityModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  drawerButton: {
    backgroundColor: '#FFD20A',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  drawerButtonSpacing: {
    marginHorizontal: 20,
  },
  drawerButtonText: {
    color: 'black',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', 
  },
  modalButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // Ensures buttons are side by side with space
  },
  modalContent: {
    width: '40%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#FFD20A',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '48%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'black',
    fontSize: 16,
  },
});

export default AdvanceSearchDrawer;
