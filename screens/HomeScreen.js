import React, {useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
const HomeScreen = ({ navigation }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.error('Permission to access media library denied');
    }
  };

  const handleDetectLogo = () => {
    navigation.navigate('ImageDetail', { selectedImage });
    console.log('pressed');
  };

  const handleImagePicker = async () => {
    console.log('image');
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.assets[0].uri);
      console.log(result.assets[0].uri)
    }
  };
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Brand Logo Detection</Text>
        <Image
          source={require('../assets/homepagelogo.webp')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.clickText}>Click here to select image</Text>

        {selectedImage && <Image source={{ uri: selectedImage }} style={styles.imagePreview} />}
        <TouchableOpacity style={styles.imagePickerButton} onPress={handleImagePicker}>
          <Text style={styles.buttonText}>Select Image</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={styles.detectButton}
          onPress={handleDetectLogo}
         
        
        >

          <Text style={styles.buttonText}>Detect Logo</Text>
        </TouchableOpacity>
          <FontAwesome name="camera" size={24} color="black" onPress={() => navigation.navigate('Logos')} />
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <FontAwesome name="user" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('AboutUs')}>
            <FontAwesome name="info" size={24} color="black" />
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
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      logo: {
        width: 200,
        height: 200,
        marginTop: 20,
      },
      clickText: {
        marginTop: 20,
      },
      imagePreview: {
        width: 250,
        height: 250,
        borderRadius: 4,
        marginBottom: 16,
      },
      detectButton: {
        backgroundColor: '#33CC66',
        padding: 16,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
        marginBottom: 12,
      },
      imagePickerButton: {
        backgroundColor: '#007BFF',
        padding: 16,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 8,
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
      },
      identifyButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
      },
      buttonText: {
        color: 'white',
        textAlign: 'center',
      },
      footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#f0f0f0',
        padding: 10,
      },
  });
  export default HomeScreen;

