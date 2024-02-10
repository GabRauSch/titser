import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {SetStateAction, useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { LoggedUser, setUserAction, setUserNameAction } from "../reducers/userReducer";
import { connect } from "react-redux";
import { RootState } from "../reducers";
import { Dispatch } from 'redux';
import AgeRange from "./confirmation/AgeRange";
import Birthday from "./confirmation/Birthday";
import Description from "./confirmation/Description";
import DistanceRange from "./confirmation/DistanceRange";
import Gender from "./confirmation/Gender";

import styles2 from '../assets/styles/components/confirmation/gender'

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

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  textArea: {
    padding: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputAge: {
    color: '#fff',
    borderColor: '#fff',
    padding: 5,
    borderWidth: .2,
    borderRadius: 5,
    textAlign: 'center',
    margin: 3
  },
  separator: {
    fontSize: 16,
    color: '#fff'
  },
  rangeInput: {
    width: '40%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    color: '#fff',
  },
  modalInput: {
    width: '80%',
    padding: 10,
    borderWidth:.2,
    borderRadius: 5,
    borderColor: '#fff',
    paddingHorizontal: 20,
    marginBottom: 20,
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
placeholder: {
  color: '#ccc'
}, modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.6)'
},
modalContent: {
  backgroundColor: '#000',
  padding: 20,
  borderRadius: 20,
  elevation: 5,
  alignItems: 'center',
  justifyContent: 'center'
},
modalItem: {
  padding: 10,
  width: 200,
  justifyContent: 'center',
  alignItems:'center',
  borderWidth: 1,
  borderRadius: 10,
  margin: 10
},
modalItemText: {
  textAlign: 'center',
  color: '#fff'
},
  input: {
    width: '80%',
    padding: 10,
    borderWidth: .2,
    borderRadius: 5,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderColor: '#fff',
    color: '#fff',
  },
  label: {
    margin: 10,
    textAlign: 'center',
    color: '#fff',
    fontSize: 15
  },
  ageRange: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelAgeValue: {
    width: '40%',
    color: '#fff',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    padding: 10,
    margin: 10
  },
  buttonChange: {
    width: 300,
    backgroundColor: '#408',
    padding: 10,
    borderRadius: 10
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff'
  },
  labelValue: {
    color: '#fff',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    padding: 10,
    width: 300
  }
});

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user,
  });
  
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    setCustomName: (payload: string) => dispatch(setUserNameAction(payload)),
  
  });

export default connect(mapStateToProps, mapDispatchToProps)(ProfileField);