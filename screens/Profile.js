import React, {useId, useState, useEffect } from 'react';
import { auth, db } from '../Firebase/firebaseConfig';
import { View, Text, StyleSheet, TouchableOpacity, navigation } from 'react-native';
import { Timestamp,doc, getDoc, collection, getDocs,query, where,uid, serverTimestamp, setDoc, addDoc, updateDoc} from 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons'; 
const UserProfile = ({navigation}) => {
  const [userInfo, setUserInfo] = useState(null);
  const [rating, setRating] = useState(0);
  const randomId = useId();
  const [latestRating, setLatestRating] = useState('');
  const handleLogout = () => {
    auth.signOut();
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
  


  
  useEffect(() => {
    const fetchUserData = async () => {
      try{
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", auth.currentUser.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            const {userName,user_id,email,dp_url,birthday}=userData
            const loggedUserInfo = {
                userRef:user_id,
                email:email,
                userName:userName,
                userProfilePic:dp_url,
                birthday:birthday
            }
            setUserInfo(loggedUserInfo)
          })
      }
      catch(e){
        console.log(e)
      }
      
    }
    fetchUserData()
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      {userInfo && (
        <View style={styles.profileContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.text}>{userInfo.userName}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{userInfo.email}</Text>
          <Text style={styles.label}>BirthDay:</Text>
          <Text style={styles.text}>{userInfo.birthday}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={handleWriteBlog}>
        <Text style={styles.buttonText}>Write a Blog</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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