import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ListResult = ({ data, renderItem }) => {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()} 
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
});

export default ListResult;
