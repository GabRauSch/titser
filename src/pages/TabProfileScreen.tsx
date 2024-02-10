import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Header from '../components/Header';
import { backendIP, backendPort } from '../apis/BackendAdress';
import { LoggedUser, setUserAction } from '../reducers/userReducer';
import { Dispatch } from 'redux';
import { RootState } from '../reducers';
import { connect } from 'react-redux';
import ProfileField from '../components/ProfileField';
import * as Api from '../apis/Titser'
import { ValidateInput } from '../components/confirmation/InputValidation';
import ErrorMessage from '../components/specials/ErrorMessage';

export type Profile = {
  description: string,
  gender: string,
  targetDistanceRange: string,
  targetGender: string,
  targetAgeRange: string
}

interface Props  {
  user: LoggedUser,
  setUser: (payload: any)=>void
}
const TabProfileScreen = ({user, setUser}: Props) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [userData, setUserData] = useState<Profile>({
    description: '', gender: '', targetDistanceRange: '',
    targetGender: '', targetAgeRange: ''
  });
  const [changed, setChanged] = useState({
    description: false, gender: false, targetDistanceRange: false, targetGender: false, targetAgeRange: false
  })
  const [userDataChanged, setUserDataChanged] = useState(false)

  const handleErrorMessage = (text: string)=>{
    setErrorMessage(text)
    setTimeout(()=>{setErrorMessage('')}, 4000)
  }

  const handleInputChange = (value: string, userKey: keyof LoggedUser)=>{
    setUserDataChanged(true)
    setUserData(prevState => ({
      ...prevState,
      [userKey]: value,
    }));
    setChanged(prevState=>({
      ...prevState,
      [userKey]: true
    }))
  }

  const handleSave = async ()=>{
    const validation = new ValidateInput(userData, handleErrorMessage, changed);
    const isValid = validation.validationSuccedded()

    if(isValid){
      setUserDataChanged(false)
      setUser(userData)
      console.log(userData)
      const response = await Api.updateUserInfo(user.id, userData)
      if(response.status !== 200){
        handleErrorMessage('Error saving your data.')
      }
    }
  }

    return (
        <View style={styles.container}>
            <Header save={userDataChanged} handleSave={userDataChanged ? handleSave : ()=>{}}/>
            <View style={styles.profileContainer}>
                <Image
                    style={styles.profileImage}
                    source={{uri: `http://${backendIP}:${backendPort}/images/${user.photo}`}}
                />
                <Text style={styles.name}>{user.customName} - {user.age} years old</Text>
            </View>
            <ScrollView style={styles.userData}>
              <ProfileField label="Your Description" userKey='description' handleInputChange={handleInputChange}/>
              <ProfileField label="Your Gender" userKey='gender' handleInputChange={handleInputChange}/>
              <ProfileField label="Matches Age" userKey='targetAgeRange' handleInputChange={handleInputChange}/>
              <ProfileField label="Matches Gender" userKey='targetGender' handleInputChange={handleInputChange}/>
              <ProfileField label="Max distance" userKey='targetDistanceRange' handleInputChange={handleInputChange}/>
            </ScrollView>
            {errorMessage && <ErrorMessage text={errorMessage}/>}
        </View>
    )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    flex: 1
  },
  userData: {

  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    backgroundColor: 'black',
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    marginTop: 10,
    color: '#ccc',
    fontSize: 18,
  },
  age: {
    marginTop: 5,
    fontSize: 16,
    color: '#888',
  },
});

const mapStateToProps = (state: RootState) => ({
  user: state.userReducer.user,
});

const mapDispatchToProps = (dispatch: Dispatch)=>({
  setUser: (payload: any)=>dispatch(setUserAction(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(TabProfileScreen);