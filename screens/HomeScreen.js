import React, {useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons';
import { auth} from '../Firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery, gql } from '@apollo/client';
import { FlatList } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

//graphql part 1
const COUNTRY_QUERY = gql `
query CountryQuery{
  countries(filter: { code: { in: ["BD", "IN", "PK"] } }){
    name
   
  }
}
`
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
const handleViewPosts = () =>{
  navigation.navigate('Posts');
}
  const handleImagePicker = async () => {
    console.log('image');
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log(result.assets[0].uri)
    }
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          navigation.replace('AppNav')
        } else {
          // User data doesn't exist, show login screen
          // or redirect to the login page
        }
      };
      checkLoggedIn()
}, [])

//graphql part 2
const{data, loading} = useQuery(COUNTRY_QUERY)
// const countries = data?.countries?.slice(0, 5);
// useEffect(()=>{
//   console.log('GraphQl===', data)
// })


    return (
      <View style={styles.container}>
      <Text style={styles.title}>Brand Logo Detection</Text>
      <Image
        source={require('../assets/homepagelogo.webp')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.clickText}>Click here to select image</Text>
    
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
      )}
      <TouchableOpacity
        style={styles.imagePickerButton}
        onPress={handleImagePicker}
      >
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>
    
      <TouchableOpacity
        style={styles.detectButton}
        onPress={handleDetectLogo}
      >
        <Text style={styles.buttonText}>Detect Logo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.viewPostsButton}
        onPress={handleViewPosts}
      >
        <Text style={styles.buttonText}>View Posts</Text>
      </TouchableOpacity>
    
    
    <Text style={styles.countriesTitle}>The Countries We Exist:</Text>
      {/* graphql part3 */}
      <FlatList
        data={data?.countries}
        renderItem={({ item }) => (
          <View style={styles.countryItem}>
            <Text style={styles.countryName}>{item.name}</Text>
          </View>
        )}
      />
      <View style={styles.iconContainer}>
      <Ionicons name="camera" size={24} color="black" onPress={() => navigation.navigate('Logos')} style={styles.icon} />
      <Ionicons name="person" size={24} color="black" onPress={() => navigation.navigate('Profile')} style={styles.icon} />
      <Ionicons name="information-circle" size={24} color="black" onPress={() => navigation.navigate('DropdownComponent')} style={styles.icon} />
    </View>
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
      iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff', // Background color of the navigation bar
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopLeftRadius: 20, // Adjust the radius as needed
        borderTopRightRadius: 20, // Adjust the radius as needed
        elevation: 5, // Add shadow effect (Android)
        shadowColor: '#000', // Add shadow effect (iOS)
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        width: 400, // Set the width to the window width
      },
      icon: {
        marginHorizontal: 10,
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
      countriesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: 'blue', 
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
      viewPostsButton: {
        backgroundColor: '#FF5733',
        padding: 16,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
        marginTop: 12,
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
      countryItem: {
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 16,
        borderRadius: 8,
        elevation: 3, // Add shadow effect (Android)
        shadowColor: '#000', // Add shadow effect (iOS)
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      countryName: {
        fontSize: 16,
        fontWeight: 'bold',
      },
    
  });
  export default HomeScreen;

