import React, {useState} from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Profile Page</Text>
        {/* Add your profile content here */}
  
        {/* Login/Signup options */}
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('LogIn')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
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
    profileButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
      },
    buttonText: {
        color: 'white',
        textAlign: 'center',
      },
  });
  export default ProfileScreen;