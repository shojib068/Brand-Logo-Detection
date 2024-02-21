import React, { useState, useEffect } from 'react';
import { auth, db } from '../Firebase/firebaseConfig';
import { View, Text, StyleSheet, TouchableOpacity, navigation } from 'react-native';
import { doc, getDoc, collection, getDocs,query, where,uid } from 'firebase/firestore';

const UserProfile = ({navigation}) => {
  const [userInfo, setUserInfo] = useState(null);

  const handleLogout = () => {
    auth.signOut();
    navigation.replace('LogIn');
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
          {/* Add more user data fields here */}
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
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
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default UserProfile;
