import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import ProfileScreen from '../screens/ProfileScreen';
import PostsScreen from '../screens/PostsScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#007AFF', // Active tab color
      inactiveTintColor: '#8E8E93', // Inactive tab color
      style: {
        flex : 1,
        backgroundColor: 'red', // Tab background color
        borderTopWidth: 1, // Top border width
        borderTopColor: '#CCCCCC', // Top border color
        height: 60, // Tab bar height
      },
      labelStyle: {
        fontSize: 12, // Font size for tab labels
        marginBottom: 5, // Margin bottom for tab labels
      },
      tabStyle: {
        justifyContent: 'center', // Center content vertically
      },
    }}>
    <Tab.Screen
      name='Profile'
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="user" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name='Posts'
      component={PostsScreen}
      options={{
        tabBarLabel: 'Posts',
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="file-text" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigator;