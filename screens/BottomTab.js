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
import Writeblog from './Writeblog';
import WeatherUpdate from './WeatherUpdate';
import ExploreML from './ExploreML';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'UserProfile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'AboutUs') {
            iconName = focused ? 'information-circle' : 'information-circle-outline';
          }
          else if (route.name === 'BlogList') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          }
          else if (route.name === 'WriteBlog') {
            iconName = focused ? 'create' : 'create-outline';
          }
          else if (route.name === 'WeatherUpdate') {
            iconName = focused ? 'partly-sunny' : 'partly-sunny-outline';
          }
          else if (route.name === 'ExploreML') {
            iconName = focused ? 'analytics' : 'analytics-outline';
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
      <Tab.Screen name="WriteBlog" component={Writeblog} initialParams={{ darkModeEnabled }}/>
      <Tab.Screen name="WeatherUpdate" component={WeatherUpdate} initialParams={{ darkModeEnabled }}/>
      <Tab.Screen name="ExploreML" component={ExploreML} initialParams={{ darkModeEnabled }}/>
      
    </Tab.Navigator>
  );
};

export default AppNavigator;
