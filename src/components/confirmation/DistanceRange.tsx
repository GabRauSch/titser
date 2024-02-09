import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from '../../assets/styles/components/confirmation/gender'
import { useState } from "react";

const genders = ['Male', 'Female', 'Other', 'Sensient Alien Robot']

type Step = 'description' | 'birthday' | 'photo' | 'gender' | 'targetDistanceRange' |  'targetGender' | 'targetAgeRange' | 'confirmData';
type UserData = {
    [key in Step]: string;
  };
  
interface Props {
  currentStep: Step,
  userData: UserData,
  handleInputChange: (text: string)=>void
}

export default ({currentStep, userData, handleInputChange}: Props)=>{
    
  return (
    <>
        <Text style={styles.rangeText}>Select the distance radius of your matches!</Text>
        <TextInput
        style={styles.input}
        placeholder="Enter distance in meters"
        placeholderTextColor={'#ccc'}
        value={userData[currentStep]}
        onChangeText={handleInputChange}
        keyboardType="numeric"
        />
    </>
  )
}