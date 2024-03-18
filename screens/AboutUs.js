import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
import { collection, getDocs, onSnapshot, getFirestore } from 'firebase/firestore';

const AboutUs = () => {
  const [overallRating, setOverallRating] = useState(0);
  const [ratings, setRatings] = useState([]);
  const API = 'a8e5ff2d1e5ba7337eaf1bb8a0e3e035';

  const openLink = (url) => {
    Linking.openURL(url);
  };

  useEffect(() => {
    const db = getFirestore();
    const ratingsRef = collection(db, 'appRatings');

    // Subscribe to changes in the ratings collection
    const unsubscribe = onSnapshot(ratingsRef, (snapshot) => {
      const ratingList = [];
      let totalRating = 0;
      let numRatings = 0;

      snapshot.forEach((doc) => {
        const ratingData = doc.data();
        totalRating += ratingData.ratings;
        numRatings++;
        ratingList.push(ratingData);
      });

      setRatings(ratingList);

      // Calculate overall rating
      const averageRating = numRatings > 0 ? totalRating / numRatings : 0;
      setOverallRating(averageRating);
    });

    return () => unsubscribe();
  }, []);
  const calculateOverallRating = () => {
    if (ratings.length === 0) return 0;
    const totalRating = ratings.reduce((acc, rating) => acc + rating.ratings, 0);
    return totalRating / ratings.length;
  };

  const renderStars = (rating) => {
    const filledStars = Math.round(rating);
    const emptyStars = 5 - filledStars;
    const starIcons = [];
    for (let i = 0; i < filledStars; i++) {
      starIcons.push(<FontAwesome key={i} name="star" size={20} color="gold" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      starIcons.push(<FontAwesome key={i + filledStars} name="star-o" size={20} color="gold" />);
    }
    return starIcons;
  };


  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>About Us</Text>

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
          Welcome to our app
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

        {/* Display Overall Rating */}
        <View style={styles.ratingContainer}>
          <Text style={styles.subHeading}>Overall App Rating</Text>
          <Text style={styles.ratingText}>{overallRating.toFixed(1)} stars</Text>
          <View style={styles.starsContainer}>
        {renderStars(calculateOverallRating())}
      </View>
        </View>

        {/* Display User Ratings */}
        <View style={styles.ratingContainer}>
          <Text style={styles.subHeading}>User Ratings</Text>
          {ratings.map((rating, index) => (
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
    padding: 20,
  },
  cardContainer: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 20,
  },
  videoContainer: {
    marginBottom: 20,
  },
  video: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  mapContainer: {
    marginBottom: 20,
  },
  map: {
    width: '100%',
    aspectRatio: 16 / 9,
  },
  socialMediaContainer: {
    marginBottom: 20,
  },
  socialMediaLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '50%',
  },
  icon: {
    marginRight: 10,
  },
  ratingContainer: {
    marginBottom: 20,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    fontSize: 16,
    marginRight: 5,
  },
  starsContainer: {
    flexDirection: 'row',
  },
});

export default AboutUs;
