import React, { useId, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Linking, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons'; 
import firebase from 'firebase/app';
import { db, firestore } from '../Firebase/firebaseConfig';
import { collection, map,doc, serverTimestamp, setDoc,query,getDocs,where, onSnapshot } from 'firebase/firestore';

const AboutUs = () => {
  const [rating, setRating] = useState(0);
  const randomId = useId();
  const [ratings, setRatings] = useState([]);
  const [ratingList, setRatingList] = useState([]);
  const openLink = (url) => {
    Linking.openURL(url);
  };
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const ratingsRef = collection(db, 'appRatings'); 
        const q = query(ratingsRef); 
        const querySnapshot = await getDocs(q);
        const ratingList = [];
        querySnapshot.forEach((doc) => {
          const ratingData = doc.data();
         
          const {email,rating,created_at} = ratingData
          const ratingUserInfo = {
            "email": email, 
           " rating": ratings, 
            "created_at": created_at 
          };
          ratingList.push(ratingData);
        });
        setRatings(ratingList);
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };
    fetchRatings();
  }, []);
  


  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>About Ussssss</Text>

        {/* Display YouTube Video */}
        <View style={styles.videoContainer}>
          <Text style={styles.subHeading}>YouTube Video</Text>
          <WebView
            style={styles.video}
            javaScriptEnabled={true}
            source={{ uri: 'https://www.youtube.com/embed/mZlKwRV4MC8' }}
          />
        </View>

        {/* Display Location on Map */}
        <View style={styles.mapContainer}>
          <Text style={styles.subHeading}>Head Office Location</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 22.4716,
              longitude: 91.7877,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker
              coordinate={{ latitude: 22.4716, longitude: 91.7877 }}
              title="Brand Logo Detection"
              description="Head Office"
            />
          </MapView>
        </View>

        {/* Display Introduction */}
        <Text style={styles.subHeading}>Introduction</Text>
        <Text style={styles.paragraph}>
          Welcome to PetEmote, where we bring the world of emotions closer to your furry companions!
          {/* Your introduction text goes here */}
        </Text>

        {/* Display Contact Information */}
        <Text style={styles.subHeading}>Contact Information</Text>
        <Text style={styles.paragraph}>
          Email: brandlogodetectionofficial@gmail.com.{'\n'}
          Phone: 987654321{'\n'}
          Address: University of Chittagong
        </Text>

        {/* Display Social Media Links */}
        <View style={styles.socialMediaContainer}>
          <Text style={styles.subHeading}>Media Links</Text>
          <View style={styles.socialMediaLinks}>
            <FontAwesome
              name="facebook-square"
              size={24}
              color="#3b5998"
              style={styles.icon}
              onPress={() => openLink('https://www.facebook.com/kashojib1010/')}
            />
            <FontAwesome
              name="twitter-square"
              size={24}
              color="#00acee"
              style={styles.icon}
              onPress={() => openLink('#')}
            />
            <FontAwesome
              name="instagram"
              size={24}
              color="#c13584"
              style={styles.icon}
              onPress={() => openLink('#')}
            />
          </View>
        </View>

       { /* Display FAQs 
       <View>
       <Text style={styles.subHeading}>Rated users</Text>
        <Text style={styles.paragraph}>
          
          </Text> 
          </View>*/} 
          <View style={styles.container}>
          <Text style={styles.subHeading}>User Ratings</Text>
          {ratings &&
            Object.values(
              ratings.reduce((acc, rating) => {
                if (!acc[rating.email] || acc[rating.email].created_at < rating.created_at) {
                  acc[rating.email] = rating;
                }
                return acc;
              }, {})
            ).map((rating, index) => (
              <View key={index} style={styles.ratingRow}>
                <Text style={styles.ratingText}>{`${rating.email.split('@')[0]}: `}</Text>
                {[...Array(rating.ratings)].map((_, i) => (
                  <FontAwesome key={i} name="star" size={20} color="gold" />
                ))}
              </View>
            ))}
        </View>
        

        
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#e80505', // Changed color to a different color
    paddingTop: 30,
  },
  videoContainer: {
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 12,
    color: '#28a745'
  },
  video: {
    height: 200,
    width: Dimensions.get('window').width - 40,
  },
  mapContainer: {
    backgroundColor: 'white',
    marginVertical: 10,
    padding: 10,
    
    borderColor: '#e80505',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  map: {
    height: 200,
    borderRadius: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 12,
  },
  socialMediaContainer: {
    marginTop: 20,
  },
  socialMediaLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 10,
  },
  ratingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    marginHorizontal: 2,
  },
  submitButton: {
    marginTop: 10,
    fontSize: 18,
    color: '#007bff', // You can change the color to match your design
    textDecorationLine: 'underline',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 18,
    marginLeft: 5,
  },
});

export default AboutUs;