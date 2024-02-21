import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome } from '@expo/vector-icons';
import LoginScreen from './screens/Login'; 
import SignupScreen from './screens/SignUp';
import HomeScreen from './screens/HomeScreen';
import LogosScreen from './screens/LogosScreen';
import ProfileScreen from './screens/ProfileScreen';
import ImageDetailScreen from './screens/ImageDetailScreen';
import UserProfile from './screens/Profile';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Brand Logo Detection',
            headerRight: () => (
              <View style={{ flexDirection: 'row', marginRight: 20 }}>
                <TouchableOpacity onPress={() => alert('Navigate')}>
                  <FontAwesome name="search" size={24} color="black" style={styles.headerIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert('Pro')}>
                  <Text style={styles.headerButton}>Pro</Text>
                </TouchableOpacity>
              </View>
            ),
          }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/>
        <Stack.Screen name="LogIn" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="SignUp" component={SignupScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Logos" component={LogosScreen} />
        <Stack.Screen name="ImageDetail" component={ImageDetailScreen} />
        <Stack.Screen name="UserProfile"component={UserProfile} options={{headerShown:false}}/>
      </Stack.Navigator>

    </NavigationContainer>
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
  

});

export default App;
