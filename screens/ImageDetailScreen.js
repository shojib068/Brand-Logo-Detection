
import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const ImageDetailScreen = ({ route }) => {
  const { selectedImage } = route.params;
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };

  const handleComment = () => {
    if (comment.trim() !== "") {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  return (
    <View style={styles.container}>
    {/* {selectedImage} */}
      <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
      <View>
        <Text style={styles.logoName}> Logo Identified</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <FontAwesome name="thumbs-up" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.likesText}>{likes} Likes</Text>
        <TouchableOpacity style={styles.actionButton} onPress={handleDislike}>
          <FontAwesome name="thumbs-down" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.likesText}>{dislikes} Dislikes</Text>
      </View>
      <View style={styles.actionContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          multiline={true}
          numberOfLines={2}
          value={comment}
          onChangeText={(text) => setComment(text)}
        />
        <TouchableOpacity style={styles.actionButton} onPress={handleComment}>
          <FontAwesome name="comment" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.commentsContainer}>
        {comments.map((comment, index) => (
          <Text key={index} style={styles.commentText}>
            {comment}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D2B53",
    padding: 16,
  },
  imagePreview: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
    resizeMode: "cover",
  },
  logoName:{
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  actionButton: {
    marginRight: 8,
  },
  likesText: {
    fontSize: 18,
    color: "white",
    marginLeft: 1,
    marginRight: 130,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    marginTop: 20,
  },
  commentInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginRight: 5,
  },
  commentsContainer: {
    marginTop: 8,
  },
  commentText: {
    color: "white",
    fontSize: 16,
    marginBottom: 4,
  },
});

export default ImageDetailScreen;
