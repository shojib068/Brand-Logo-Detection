import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Table = () => {
  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>id</Text>
          <Text style={styles.tableHeader}>Name</Text>
          <Text style={styles.tableHeader}>Phone</Text>
          <Text style={styles.tableHeader}>Email</Text>
          <Text style={styles.tableHeader}>Gender</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableData}></Text>
          <Text style={styles.tableData}></Text>
          <Text style={styles.tableData}></Text>
          <Text style={styles.tableData}></Text>
          <Text style={styles.tableData}></Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10, 
  },
  table: {
    borderWidth: 1,
    borderColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    height: 40,
  },
  tableHeader: {
    flex: 1,
    padding: 10,
    fontWeight: 'bold',
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
  tableData: {
    flex: 1,
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: '#000',
  },
});

export default Table;
