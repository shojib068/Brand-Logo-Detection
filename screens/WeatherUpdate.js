import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, TouchableOpacity } from 'react-native';
import Weather from '../component/Weather';
import SearchBar from '../component/SearchBar';
import { Ionicons } from '@expo/vector-icons';
const API_KEY = "a8e5ff2d1e5ba7337eaf1bb8a0e3e035";

const WeatherUpdate = ({ navigation }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(true);

    async function fetchWeatherData(cityName) {
        setLoaded(false);
       const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
        try {
            const response = await fetch(API);
            if (response.status == 200) {
                const data = await response.json();
                setWeatherData(data);
            } else {
                setWeatherData(null);
            }
            setLoaded(true);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchWeatherData('Chittagong');
    }, []);

    const handleBackProfile = () => {
        navigation.replace('UserProfile');
    };
    const handleBackWeather = () => {
        navigation.replace('WeatherUpdate');
    };

    if (!loaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color='gray' size={36} />
            </View>
        );
    } else if (weatherData === null) {
        return (
            <View style={styles.container}>
                <SearchBar fetchWeatherData={fetchWeatherData} />
                <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
                <TouchableOpacity style={styles.backButton} onPress={handleBackWeather }>
                <Ionicons name="arrow-back" size={24} color="black" />
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
            <TouchableOpacity style={styles.backButton} onPress={handleBackProfile }>
                <Ionicons name="arrow-back" size={24} color="black" />
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryText: {
        margin: 20,
        fontSize: 28
    }
});

export default WeatherUpdate;
