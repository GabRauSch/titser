import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
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


interface Props {
  label: string;
  value: string | string[] | any;
  user: LoggedUser,
  userKey: keyof LoggedUser,
  handleInputChange: (value: string, userKey: keyof LoggedUser)=>void
}

const ProfileField = ({userKey, label, value, user, handleInputChange}: Props) => {
    const handleChange = ()=>{
        console.log(1)
    }
    useEffect(()=>{

    }, [])

    console.log(user[userKey])
    const [input, setInput] = useState(user[userKey])
    const [inputMaxAge, setInputMaxAge] = useState(user[userKey])
    const [inputMinAge, setInputMinAge] = useState(user[userKey])
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.textArea}>
          <Text style={styles.label}>{label}</Text>
            <>
              {userKey === 'targetAgeRange' && <AgeRange />}
              {userKey === 'age' && <Birthday />}
              {userKey === 'description' && (
                <TextInput
                style={styles.input}
                placeholder={'Description'}
                placeholderTextColor={'#ccc'}
                value={input}
                onChangeText={(text)=>{handleInputChange(text, userKey)}}
              />
              )}
              {userKey === 'targetDistanceRange' && <DistanceRange />}
              {userKey === 'gender' && <Gender />}
            </>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20
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
  rangeInput: {
    width: '40%',
    height: 50,
    borderWidth: 1,
    borderColor: '#81d',
    borderRadius: 10,
    paddingHorizontal: 20,
    color: '#fff',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#81d',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    color: '#fff',
  },
  label: {
    margin: 10,
    textAlign: 'center',
    color: '#fff',
    fontSize: 20
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