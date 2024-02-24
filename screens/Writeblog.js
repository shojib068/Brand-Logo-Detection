import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { auth, db } from '../Firebase/firebaseConfig';
import { Timestamp, addDoc, collection, doc, updateDoc,query, where,getDocs } from 'firebase/firestore';

const WriteBlogScreen = ({ navigation }) => {
  const [blogContent, setBlogContent] = useState('');
  const [userInfo, setUserInfo] = useState(null);
 

  const handleSubmit = async () => {
    const usersRef = collection(db,'blogs')
    try{

        const docRef = await addDoc(usersRef,{
            
             "email":auth.currentUser.email,
            "blogContent": blogContent,
            "created_at": Timestamp.fromDate(new Date()),
            "blog_id":''
        });
        
        updateDoc(doc(db,"blogs",docRef.id),{"blog_id":docRef.id})
    }
    catch(e){
        console.log(e)
    }
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Write a Blog</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Write your blog post here..."
        value={blogContent}
        onChangeText={setBlogContent}
      />
      <Button title="Submit" onPress={handleSubmit} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    height: 200, // Adjust the height as needed
  },
});

export default WriteBlogScreen;
