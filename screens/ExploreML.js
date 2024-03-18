import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, FlatList, ActivityIndicator, item, getItem, navigation } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { collection, addDoc, updateDoc, doc, serverTimestamp, increment, decrement, arrayUnion, arrayRemove, getDoc, onSnapshot } from 'firebase/firestore'; // Import Firestore methods
import { db } from '../Firebase/firebaseConfig'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as tf from "@tensorflow/tfjs";
import * as FileSystem from "expo-file-system";
import {
  bundleResourceIO,
  decodeJpeg,
  fetch,
} from "@tensorflow/tfjs-react-native";

const modelJson = require("../assets/trained_model/model.json");
const modelWeights = require("../assets/trained_model/weights.bin");

const datasetClasses = [
  // "Invalid",
  "cocacola",
  "asus",
  "pran",
  "adidas",
  "mojo",
];

const transformImageToTensor = async (uri) => {
  //read the image as base64
  const img64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const imgBuffer = tf.util.encodeString(img64, "base64").buffer;
  const raw = new Uint8Array(imgBuffer);
  let imgTensor = decodeJpeg(raw);
  const scalar = tf.scalar(255);
  //resize the image
  imgTensor = tf.image.resizeNearestNeighbor(imgTensor, [224, 224]);
  //normalize; if a normalization layer is in the model, this step can be skipped
  const tensorScaled = imgTensor.div(scalar);
  //final shape of the tensor
  const img = tf.reshape(tensorScaled, [1, 224, 224, 3]);
  return img;
};

const ExploreML = ({navigation}) => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [galleryPermission, setGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [expression, setExpression] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState('');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [showPosts, setShowPosts] = useState(false); 
  const [commentText, setCommentText] = useState('');
  const [userData, setUserData] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [user, setuser] = useState({})
  const [showPostButton, setShowPostButton] = useState(false);
  const [newImageUri, setnewImageUri] = useState(null)
  const [commentTexts, setCommentTexts] = useState({});
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [model, setModel] = useState();
// Add state variables for pagination
const [currentPage, setCurrentPage] = useState(1);
const postsPerPage = 5; // Number of posts per page

  const storageUrl = 'petemotes-25000.appspot.com';

  const [commentsToShow, setCommentsToShow] = useState(0); // State to keep track of the number of comments to show
  // Other state variables and useEffects

  

 
  
 

  useEffect(() => {
    (async () => {
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setCameraPermission(cameraPermission.status === 'granted');
      setGalleryPermission(galleryPermission.status === 'granted');
    })();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'posts'), (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      postsData.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.toMillis() - a.createdAt.toMillis();
        } else if (a.createdAt) {
          return -1;
        } else if (b.createdAt) {
          return 1;
        } else {
          return 0;
        }
      });
      setPosts(postsData);
    });
    setShowPosts(true);
    return () => unsubscribe();
  }, []);

  const getImageUrlToShow = (image) => {
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${storageUrl}/o/${encodeURIComponent(image)}?alt=media`;
    return imageUrl
  }

 

  useEffect(() => {
    const getUser = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if(userData){
        const user = JSON.parse(userData);
        setUserData(user)
        setCurrentUserId(user.userRef)
        preFetchDP(user.userProfilePic)
      }
      else{
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", auth.currentUser.email));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const userData = doc.data();
            const { userName, user_id, email, dp_url,birthday } = userData;
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
  }, [])

  useEffect(() => {
    if(userData) preFetchDP(userData.userProfilePic)
  }, [userData])

  const takePicture = async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaPermissionStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (status === "granted" && mediaPermissionStatus === "granted") {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        });
  
        if (!result.canceled) {
          setSelectedImage(result.assets[0].uri);
          setLoading(true);
        await tf.ready();
        const model = await tf.loadLayersModel(
          bundleResourceIO(modelJson, modelWeights)
        );
        setModel(model);

        const imageTensor = await transformImageToTensor(result.assets[0].uri);
        const predictions = model.predict(imageTensor);
        const highestPredictionIndex = predictions.argMax(1).dataSync();
        const predictedClass = `${datasetClasses[highestPredictionIndex]}`;
        console.log(predictedClass);
        setPrediction(predictedClass);
        setLoading(false);
        
          setIsCameraOpen(false); // Close the camera after taking the picture
        setShowPostButton(true);
        }
      } else {
        alert("Camera permission not granted");
      }
  };

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
  
    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setImageUri(result.assets[0].uri);
      // detectExpression(result.assets[0].uri); // Detect expression for the selected image
      // setIsCameraOpen(false); // Close the camera if it's open
      // setShowPostButton(true); // Show the post button after selecting the image
      setLoading(true);
        await tf.ready();
        const model = await tf.loadLayersModel(
          bundleResourceIO(modelJson, modelWeights)
        );
        setModel(model);

        const imageTensor = await transformImageToTensor(result.assets[0].uri);
        const predictions = model.predict(imageTensor);
        const highestPredictionIndex = predictions.argMax(1).dataSync();
        const predictedClass = `${datasetClasses[highestPredictionIndex]}`;
        console.log(predictedClass);
        setPrediction(predictedClass);
        setLoading(false);
    }
  };
  const preFetchDP = (userProfilePic) => {
    const imageRef = getImageUrlToShow(userProfilePic)
    setImageUri(imageRef)
    setnewImageUri(imageRef)
  }
  const back = () => {
    navigation.replace('UserProfile');
};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Detect and Create a post</Text>
      </View>
      <View style={styles.postContainer}>
        <View style={styles.inputContainer}>
          <Image source={{ uri: imageUri}} style={styles.profileImage} />
        </View>
        {!selectedImage && (
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton} onPress={takePicture}>
              <Ionicons name="camera" size={24} color="black" />
              <Text style={styles.actionText}>Take Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={pickImageFromGallery}>
              <Ionicons name="image" size={24} color="black" />
              <Text style={styles.actionText}>Pick from Gallery</Text>
            </TouchableOpacity>
          </View>
        )}
        {selectedImage && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: selectedImage }} style={styles.image} />
            <Text style={styles.predictionText}>
              Detected logo: {loading ? (
                <ActivityIndicator size={24} color={"#002D02"} />
              ) : (
                prediction
              )}
            </Text>
            <TouchableOpacity style={styles.backButton} onPress={(back) => setSelectedImage(null)}>
              <Ionicons name="arrow-back" size={24} color="black" />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <TouchableOpacity style={styles.backButton} onPress={back}>
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
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  postContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  camera: {
    height: 200,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  takePictureButton: {
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  imageContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 350,
    marginBottom: 10,
    borderRadius: 10,
  },
  predictionText: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },
  actionText: {
    marginLeft: 5,
  },
  post: {
    marginBottom: 20,
  },
  interactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  interactionButtonText: {
    marginLeft: 5,
  },
  commentsContainer: {
    marginTop: 10,
  },
  commentsTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  comment: {
    marginLeft: 10,
    marginBottom: 5,
  },
  inputComment: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginTop: 10,
  },
  commentButton: {
    backgroundColor: '#4267B2',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: 10,
  },
  commentButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',

  },
  postImageButton: {
    backgroundColor: '#4267B2',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: 10,
  },
  postImageButtonText: {
    color: '#fff',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userProfileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  commentContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  commentUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  commentUserProfilePic: {
    width: 20, // Adjust width to make the profile picture smaller
    height: 20, // Adjust height to make the profile picture smaller
    borderRadius: 10, // Keep border radius half of the width or height to maintain a circular shape
    marginRight: 10,
  },
  commentUserName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  commentText: {
    fontSize: 14,
  },
  loadMoreButton: {
    backgroundColor: '#4267B2',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginTop: 10,
    alignSelf: 'flex-start', // Align the button to the left side
  },
  loadMoreButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  postText: {
    fontSize: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationButton: {
    backgroundColor: '#4267B2',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 5,
  },
  paginationButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pageNumber: {
    paddingHorizontal: 10,
    fontSize: 16,
  },

});
export default ExploreML;