import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const UserProfile = () => {
  const [selectedImage, setSelectedImage] = React.useState(null);

  const createFormData = (uri) => {
    const fileName = uri.split('/').pop();
    const fileType = fileName.split('.').pop();
    const formData = new FormData();
    formData.append('image', {
      name: fileName,
      uri,
      type: `image/${fileType}`,
    });
    return formData;
  };

  const pickImageAsync = async () => {
    try {
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      } else {
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  
    useEffect(() => {
      if(selectedImage){

        const postImage = async () => {
          const data = createFormData(selectedImage);
          const res = await axios.post('http://192.168.202.161:8000/Profile', data, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          });
          // return res.data.imageName
        };

        postImage();

      }
    },[selectedImage])
  
  return <TouchableOpacity style={uploadPhotoStyles.container} onPress={pickImageAsync} >
    <Text>+</Text>
  </TouchableOpacity>
}
const uploadPhotoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 16,
    borderRadius: 50
  }
})
export default UserProfile;