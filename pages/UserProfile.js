import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text,Image, TouchableOpacity, View, Button, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

//https
import { postImage } from "../utils/https";

//context
import { Context } from "../store/context";

const UserProfile = () => {
  const ctx = useContext(Context);
  const navigation = useNavigation();

  const [selectedImage, setSelectedImage] = React.useState(null);
  const [fetchedImageUrl , setFetchedImageUrl] = React.useState();
  const [sending, setSending] = React.useState(false);

  const createFormData = (uri) => {
    const fileName = uri.split("/").pop();
    const fileType = fileName.split(".").pop();
    const formData = new FormData();
    formData.append("image", {
      name: fileName,
      uri,
      type: `image/${fileType}`,
    });
    return formData;
  };

  const pickImageAsync = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      } 
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: false,
          quality: 1,
        });
        if (!result.canceled) {
          console.log(result);
          setSelectedImage(result.assets[0].uri);
          console.log("selectedImage", selectedImage);
        }
      
    } catch (error) {
      setSending(false);
      console.log(error);
    }
  };

  const handleCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }
    let result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log("selectedImage", selectedImage);
    }
  };
  useEffect(() => {
    const uploadImage = async () => {
      setSending(true);
      if (selectedImage) {
        const data = createFormData(selectedImage);
        try {
          const returnedImageData = await postImage(data, setSending);
          console.log(returnedImageData);
          setSending(false);
          setFetchedImageUrl(returnedImageData.downloadURL)
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    };
  
    uploadImage();
  }, [selectedImage]);
 
  const handleLogout = () => {
    ctx.value.setLogin(false);
    navigation.navigate('Login')
  }
 
  return (
    <View style={{alignItems : 'center', justifyContent : 'center', flex : 1}}>
     {sending ? <ActivityIndicator size='large' />  :(
        <Image source={{ uri: fetchedImageUrl }} style={uploadPhotoStyles.image} />
      ) }
      <View>
        <Text style={{fontSize : 20}} >{ctx.value.currentUserData.Name}</Text>
      </View>
      <View style={{gap : 10}} >
        <Button title="Add profile pic" onPress={pickImageAsync} />
        <Button title="Open camera" onPress={handleCamera} />
      </View>
<View style={{marginTop : 50}}>

<Button title="Logout" onPress={handleLogout} />
</View>
     
    </View>
  );
};
const uploadPhotoStyles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop : 100,
    // backgroundColor: "#fff",
    alignItems: "center",
    
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 100,
    borderRadius: 50,
  },
});
export default UserProfile;
