import { GestureResponderEvent, Image, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from '../../assets/styles/components/confirmation/gender'
import { Dispatch, SetStateAction, useState } from "react";
import * as ImagePicker from 'expo-image-picker';


const genders = ['Male', 'Female', 'Other', 'Sensient Alien Robot']

type Step = 'description' | 'birthday' | 'photo' | 'gender' | 'targetDistanceRange' |  'targetGender' | 'targetAgeRange' | 'confirmData';
type UserData = {
    [key in Step]: string;
  };
  
interface Props {
  selectedImage: any,
  setSelectedImage: Dispatch<SetStateAction<{ localUri: string; }>>,
  handleInputChange: (text: string)=>void
}

export default ({selectedImage, setSelectedImage, handleInputChange}: Props)=>{
    const handleChoosePhoto = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
          return;
        }
    
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, 
            aspect: [4, 5], 
            base64: false,
            quality: 1
        });
        if (pickerResult.canceled === true) {
          return;
        }
        const resultUri = pickerResult.assets[0].uri as string
    
        setSelectedImage({ localUri: resultUri });
        handleInputChange(resultUri)
      };
    
  return (
    <>
        {selectedImage.localUri ? (
            <>
                <Image
                    source={{ uri: selectedImage.localUri }}
                    style={{ width: 300, height: 300, marginTop: 20 }}
                />
                <TouchableOpacity style={styles.changePhoto} onPress={handleChoosePhoto}>
                    <Text style={styles.buttonText}>Change Photo</Text>
                </TouchableOpacity>
            </>
            
        ) : (
        <TouchableOpacity style={styles.uploadPhoto} onPress={handleChoosePhoto}>
            <Text style={styles.buttonText}>Select Photo</Text>
        </TouchableOpacity>
        )}
    </>
  )
}