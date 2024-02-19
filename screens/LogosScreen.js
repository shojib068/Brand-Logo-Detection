import React, {useState} from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';


const LogosScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>

      {/* Logos Row 1 */}
      <View style={styles.logoRow}>
        {/* Google Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoType}>Google</Text>
          <Image
            source={require('../assets/nike-logo.jpeg')} // Replace with the path to the Google logo
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* Facebook Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoType}>Facebook</Text>
          <Image
            source={require('../assets/nike-logo.jpeg')} // Replace with the path to the Facebook logo
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Logos Row 2 */}
      <View style={styles.logoRow}>
        {/* Amazon Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoType}>Amazon</Text>
          <Image
            source={require('../assets/nike-logo.jpeg')} // Replace with the path to the Amazon logo
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>

        {/* Add more logos as needed */}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      logo: {
        width: 200,
        height: 200,
        marginTop: 20,
      },
      logoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
      },
      logoContainer: {
        alignItems: 'center',
        marginHorizontal: 10, 
        marginBottom: 20, 
      },
      logoType: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
      },
      logoImage: {
        width: 150,
        height: 150,
        marginTop: 10,
      },
});
export default LogosScreen;