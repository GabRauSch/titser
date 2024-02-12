import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {SetStateAction, useEffect, useState } from "react";
import { LoggedUser, setUserAction, setUserNameAction } from "../reducers/userReducer";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import { Dispatch } from 'redux';
import styles2 from '../assets/styles/components/confirmation/gender'
import { styles } from "../assets/styles/components/ProfileField";

const genders = ['Male', 'Female', 'Other', 'Sensient Alien Robot']

interface Props {
  label: string;
  user: LoggedUser,
  userKey: keyof LoggedUser,
  handleInputChange: (value: string, userKey: keyof LoggedUser)=>void
}

const ProfileField = ({userKey, label, user, handleInputChange}: Props) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [input, setInput] = useState(user[userKey])
    const [inputMaxAge, setInputMaxAge] = useState<string>('0')
    const [inputMinAge, setInputMinAge] = useState<string>('0')
    
    useEffect(()=>{
      if(userKey === 'targetAgeRange'){
        console.log(user[userKey][0])
        setInputMinAge(user[userKey][0].toString())
        setInputMaxAge(user[userKey][1].toString())
      }
    }, [])
    
    const handleGenderChange = (gender: string) => {
        setModalVisible(false);
        handleInputChange(gender.toLowerCase(), userKey)
      };
    
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.textArea}>
          <Text style={styles.label}>{label}</Text>
            <>
              {userKey === 'targetAgeRange' && (
              <View style={styles2.ageRangeInputArea}>
                <View style={styles2.inputContainer}>
                    <Text style={styles.separator}>From: </Text>
                    <TextInput
                        style={styles.inputAge}
                        onChangeText={(text)=>{setInputMinAge(text); handleInputChange(`${text}-${inputMaxAge}`, userKey)}}
                        value={inputMinAge.toString()}
                        keyboardType="numeric"
                    />
                    <Text style={styles.separator}>to: </Text>
                    <TextInput
                        style={styles.inputAge}
                        onChangeText={(text)=>{setInputMaxAge(text); handleInputChange(`${inputMinAge}-${text}`, userKey)}}
                        value={inputMaxAge.toString()}
                        keyboardType="numeric"
                    />
                </View>
            </View>
              )}
              {userKey === 'description' && (
                <TextInput
                style={styles.input}
                placeholder={'Description'}
                placeholderTextColor={'#ccc'}
                value={input}
                onChangeText={(text)=>{handleInputChange(text, userKey); setInput(text)}}
              />
              )}
              {userKey === 'targetDistanceRange' && (
                <TextInput
                  style={styles.input}
                  placeholder="Enter distance in meters"
                  placeholderTextColor={'#ccc'}
                  value={input.toString()}
                  onChangeText={(text)=>{handleInputChange(text, userKey)}}
                  keyboardType="numeric"
                  />
              )}
              {(userKey === 'gender' || userKey === 'targetGender') &&(
                <>
                <TouchableOpacity style={styles.modalInput} onPress={() => setModalVisible(true)}>
                    <Text style={styles.placeholder}>{input ? input: 'Select Gender'}</Text>
                </TouchableOpacity>
        
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            {genders.map((gender, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.modalItem}
                                onPress={() => {handleGenderChange(gender), setInput(gender)}}
                            >
                                <Text style={styles.modalItemText}>{gender}</Text>
                            </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </Modal>
                </>  
              )}
            </>
        </View>
      </View>
    </View>
  )
}



const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user,
  });
  
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    setCustomName: (payload: string) => dispatch(setUserNameAction(payload)),
  
  });

export default connect(mapStateToProps, mapDispatchToProps)(ProfileField);