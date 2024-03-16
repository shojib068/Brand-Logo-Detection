import React, {useId, useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { auth, db, firestore } from '../Firebase/firebaseConfig';
import { View, Text,ScrollView, StyleSheet, TouchableOpacity, Image, navigation , Pressable} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import { Timestamp,doc, getDoc, collection, getDocs,query, where,uid, serverTimestamp, setDoc, addDoc, updateDoc} from 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
const UserProfile = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [rating, setRating] = useState(0);
  const randomId = useId();
  const [newImageUri, setnewImageUri] = useState(null)
  const [imageUri, setImageUri] = useState(null);
  const [latestRating, setLatestRating] = useState('');
  const storageUrl = 'brandlogodetection-ccf38.appspot.com';
  const handleLogout = () => {
    auth.signOut();
    AsyncStorage.removeItem('userData')
    navigation.replace('LogIn');
  };
  const handleWriteBlog =() => {
    navigation.replace('WriteBlog');
  };
  const submitRating = async () => {
    try {
      const ratingsRef = collection(db, "appRatings");
      const userRatingsQuery = query(ratingsRef, where("email", "==", auth.currentUser.email));
      const userRatingsSnapshot = await getDocs(userRatingsQuery);
      const userRatings = userRatingsSnapshot.docs.map(doc => doc.data());
  
      if (userRatings.length > 0) {
        // User has already given ratings, update the existing rating record
        const userRatingDoc = userRatingsSnapshot.docs[0]; // Assuming there's only one rating per user
        const userRatingId = userRatingDoc.id;
        await updateDoc(doc(db, "appRatings", userRatingId), {
          ratings: rating,
          created_at: Timestamp.fromDate(new Date())
        });
        alert(`Your rating has been updated to ${rating} stars`);
      } else {
        // User has not given ratings before, add a new rating record
        const docRef = await addDoc(ratingsRef, {
          email: auth.currentUser.email,
          ratings: rating,
          created_at: Timestamp.fromDate(new Date())
        });
        alert(`You have rated ${rating} stars`);
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert("Failed to submit rating. Please try again later.");
    }
  };
  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      try {
        setnewImageUri(result.assets[0].uri);
        setImageUri(result.assets[0].uri)

        const fileName = `profileImages/${userData.userRef}.jpg`;

        try {
          const response = await fetch(
            'https://firebasestorage.googleapis.com/v0/b/'+storageUrl+'/o?name='+fileName,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'image/jpeg' || 'image/png' || 'image/jpg',
              },
              body: await fetch(result.assets[0].uri).then((response) => response.blob()),
            }
          );
          if (response.ok) {
            try {
              const temp = userData
              temp.userProfilePic = fileName
              const userData2 = await AsyncStorage.getItem('userData');
              if(userData2){
                const user = JSON.stringify(temp);
                await AsyncStorage.setItem('userData',user)
              }
              setUserData(temp)
              await updateDoc( doc(db, 'users', userData.userRef), {dp_url:fileName});
            } catch (error) {
              console.error('Error updating profile picture:', error);
              alert('Something went wrong')
            }
            alert('Profile Information Updated')
  
          } 
          else {
            console.error('Error uploading image:', response.statusText);
          }
         } 
         catch (error) {
          console.error('Error uploading image 2:', error);
        }
        
      } catch (error) {
        console.log('Error uploading image 3:', error);
        Alert.alert('Upload Failed', 'Failed to upload image. Please try again later.');
      }
    }
  };

  const getImageUrlToShow = (image)=>{
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${storageUrl}/o/${encodeURIComponent(image)}?alt=media`;
    return imageUrl
  }

  const preFetchDP = (userProfilePic)=>{
    const imageRef = getImageUrlToShow(userProfilePic)
    setImageUri(imageRef)
    setnewImageUri(imageRef)
  }

  // console.log(imageUri)
  const uploadAnImage = async () => {
    try{
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
  
      if (!result.canceled) {
        setnewImageUri(result.assets[0].uri);
        setImageUri(result.assets[0].uri)
      }
    }
    catch(e){
      console.log(e)
    }
    
  };

 const weatherCondition = async ()=>{
  navigation.replace('WeatherUpdate');
 } 
  useEffect(() => {
    const getUser = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if(userData){
        const user = JSON.parse(userData);
        setUserData(user)
         preFetchDP(user.userProfilePic)
      }
      else{
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", auth.currentUser.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            const { userName, user_id, email, dp_url, birthday } = userData;
            const loggedUserInfo = {
                userRef: user_id,
                userEmail: email,
                userName: userName,
                userProfilePic: dp_url,
                 birthday
            };
            
            setUserData(loggedUserInfo)
             preFetchDP(dp_url)
          }
        );
      }
    }
    getUser()
  }, []);
  useEffect(() => {
    if(userData) preFetchDP(userData.userProfilePic)
  }, [userData])

  return (
    <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
      {userData && (
        <View style={styles.profileContainer}>
        <TouchableOpacity onPress={handleImagePick}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </TouchableOpacity>
      
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.text}>{userData.userName}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{userData.userEmail}</Text>
          <Text style={styles.label}>BirthDay:</Text>
          <Text style={styles.text}>{userData.birthday}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={handleWriteBlog}>
        <Text style={styles.buttonText}>Write a Blog</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={weatherCondition}>
        <Text style={styles.buttonText}>Weather</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.ratingContainer}>
        <Text style={styles.subHeading}>Rate Our App</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star, index) => (
            <TouchableOpacity 
              key={index} 
              onPress={() => setRating(star)}
            >
              <FontAwesome
                name={star <= rating ? "star" : "star-o"}
                size={30}
                color={star <= rating ? "#FFD700" : "#ccc"}
                style={styles.starIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={submitRating}>
          <Text style={styles.submitButton}>Submit Rating</Text>
        </TouchableOpacity>
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
  imageUploadButtonContainer:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height:'auto',
    padding:10,
    margin:5
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  ratingContainer: {
    marginTop: 20,
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    marginRight: 5,
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    width: 150,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default UserProfile;