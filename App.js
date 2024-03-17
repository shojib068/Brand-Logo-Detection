import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
// import store from '.redux/store';
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
import AboutUs from './screens/AboutUs';
import WriteBlogScreen from './screens/Writeblog';
import AppNavigator from './screens/BottomTab';
import Table from './component/table';
import BlogList from './screens/AllBlogLists';
import BlogListItem from './component/BlogsListItem';
import BlogUI from './screens/ABlog';
import WeatherUpdate from './screens/WeatherUpdate';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
const Stack = createStackNavigator();
// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/graphql',
  cache: new InMemoryCache()
});
const App = () => {
  return (
    <ApolloProvider client={client}>
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
        <Stack.Screen name="LogIn" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown:false}}/>
        <Stack.Screen name="WriteBlog" component={WriteBlogScreen} options={{headerShown:false}}/>
        <Stack.Screen name="AppNav" component={AppNavigator} options={{headerShown:false}}/>
        <Stack.Screen name="SignUp" component={SignupScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Logos" component={LogosScreen} />
        <Stack.Screen name="ImageDetail" component={ImageDetailScreen} />
        <Stack.Screen name="UserProfile"component={UserProfile} options={{headerShown:false}}/>
        <Stack.Screen name="AboutUs" component={AboutUs} options={{headerShown:false}}/>
        <Stack.Screen name="Table" component={Table} options={{headerShown:false}}/>
        <Stack.Screen name="BlogList" component={BlogList} options={{headerShown:false}}/>
        <Stack.Screen name="BlogListItem" component={BlogListItem} options={{headerShown:false}}/>
        <Stack.Screen name="ABlog" component={BlogUI} options={{headerShown:false}}/>
        <Stack.Screen name="WeatherUpdate" component={WeatherUpdate} options={{headerShown:false}}/>
       
    
               
   
            
      </Stack.Navigator>

    </NavigationContainer>
    </ApolloProvider>
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
