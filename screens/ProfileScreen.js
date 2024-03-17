import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import './ProfileScreen.scss';

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
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    profileButton: {
      backgroundColor: 'green',
      padding: 20, 
      borderRadius: 10,
      marginTop: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  export default ProfileScreen;