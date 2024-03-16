import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import SettingsScreen from './SettingsScreen';
import HomeScreen from './HomeScreen';
import UserProfile from './Profile';
import AboutUs from './AboutUs';
import table from '../component/table';
import BlogList from './AllBlogLists';
import BlogUI from './ABlog';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'UserProfile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'AboutUs') {
            iconName = focused ? 'help-circle' : 'help-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: darkModeEnabled ? '#222' : '#fff', borderTopWidth: 0 },
      })}
    >
      <Tab.Screen name="UserProfile" component={UserProfile} initialParams={{ darkModeEnabled }} />
      <Tab.Screen name="Settings" component={SettingsScreen} initialParams={{ darkModeEnabled }} />
      <Tab.Screen name="AboutUs" component={AboutUs} initialParams={{ darkModeEnabled }} />
      <Tab.Screen name="BlogList" component={BlogList} initialParams={{ darkModeEnabled }}/>
      
    </Tab.Navigator>
  );
};

export default AppNavigator;
