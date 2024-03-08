import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, useColorScheme } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { auth } from '../Firebase/firebaseConfig';

const SettingsScreen = ({ navigation }) => {
  const colorScheme = useColorScheme();
  const [darkModeEnabled, setDarkModeEnabled] = useState(colorScheme === 'dark');

  useEffect(() => {
    setDarkModeEnabled(colorScheme === 'dark');
  }, [colorScheme]);

  const onToggleDarkMode = () => {
    const newMode = !darkModeEnabled;
    setDarkModeEnabled(newMode);
    // Save the new mode to AsyncStorage or your preferred storage
    // You can use newMode to adjust your app's appearance
  };

  const onSignOutPress = () => {
    auth.signOut();
    navigation.replace('LogIn');
  };

  return (
    <View style={[styles.container, { backgroundColor: darkModeEnabled ? '#121212' : '#ffffff' }]}>
      <Text style={[styles.title, { color: darkModeEnabled ? '#ffffff' : '#000000' }]}>Settings</Text>

      {/* Dark Mode Toggle */}
      <View style={[styles.setting, { borderColor: darkModeEnabled ? '#ffffff' : '#000000' }]}>
        <Text style={[styles.settingText, { color: darkModeEnabled ? '#ffffff' : '#000000' }]}>Dark Mode</Text>
        <Switch
          value={darkModeEnabled}
          onValueChange={onToggleDarkMode}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={darkModeEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity onPress={onSignOutPress} style={styles.button}>
        <AntDesign name="logout" size={24} color={darkModeEnabled ? '#ffffff' : '#000000'} />
        <Text style={[styles.buttonTitle, { color: darkModeEnabled ? '#ffffff' : '#000000' }]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  settingText: {
    fontSize: 18,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0066cc',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default SettingsScreen;
