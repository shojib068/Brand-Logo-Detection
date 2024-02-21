import React, { useState, useEffect } from 'react';
import { auth, db } from '../Firebase/firebaseConfig';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);

  const handleLogout = async () => {
    await auth.signOut();
    navigation.replace('LogIn');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
         const docRef = query(collection(db, 'users'), where('user_id', '==', auth.currentUser.uid));
         console.log(uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data());
          setUserInfo(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
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
