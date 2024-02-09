import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Platform, Button, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ErrorMessage from '../../components/specials/ErrorMessage';
import Description from '../../components/confirmation/Description';
import Birthday from '../../components/confirmation/Birthday';
import Gender from '../../components/confirmation/Gender';
import DistanceRange from '../../components/confirmation/DistanceRange';
import AgeRange from '../../components/confirmation/AgeRange';
import { handleNextStep } from '../../components/confirmation/HandleNextStep';
import Photo from '../../components/confirmation/Photo';
import Confirmation from '../../components/confirmation/ConfirmationItem';
import ConfirmationItem from '../../components/confirmation/ConfirmationItem';
import { RootState } from '../../reducers';
import { Dispatch } from 'redux';
import { LoggedUser, setUserAction } from '../../reducers/userReducer';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decodeToken } from '../../apis/Token';
import * as Api from '../../apis/Titser'
import { StackNavigationProp } from '@react-navigation/stack';

export const genders = ['Male', 'Female', 'Other', 'Sensient Alien Robot']
export type Step = 'description'|'birthday'|'photo'|'gender'|'targetDistanceRange'|'targetGender'|'targetAgeRange'|'confirmData';
export type UserData = {
    [key in Step]: string;
  };

  type RootStackParamList = {
    Login: undefined;
    RegisterCompletation: undefined
  };
  
type RegisterCompletationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RegisterCompletation'>;

type Props = {
    navigation: RegisterCompletationScreenNavigationProp,
    user: LoggedUser,
    setUser: (payload: any)=>void
}

const RegisterCompletion = (props:Props) => {
  const logoImage = require('../../assets/images/titserLogo.png');
  const [userData, setUserData] = useState<{ [key in Step]: string }>({
    description: '', birthday: '', photo: '', gender: '', targetDistanceRange: '',
    targetGender: '', targetAgeRange: '', confirmData: ''
  });
  const [selectedImage, setSelectedImage] = useState({localUri: ''});
  const [errorMessage, setErrorMessage] = useState('');
  const [currentStep, setCurrentStep] = useState<Step>('description');
  const [date, setDate] = useState<string>('');

  const initialTasks: Step[] = [
    'description',
    'birthday', 
  'photo', 'gender','targetDistanceRange', 'targetGender', 
  'targetAgeRange',
  'confirmData'];
  const [tasks, setTasks] = useState<Step[]>(initialTasks);

  const handleChange = (key: Step)=>{
    setCurrentStep(key);
    const updatedTasks = [...tasks];
    updatedTasks.unshift(key);
    setTasks(updatedTasks);
  }

  const handleConfirm = async ()=>{
      const userToken = await AsyncStorage.getItem('userToken');
      console.log(userToken)
      if(!userToken){
          return setErrorMessage("Your register wen't wrong. Contact the developer!")
    }
    const decoded = decodeToken(userToken)
    if(decoded.id){
        const responsePhoto = await Api.updateUserImage(decoded.id, userData.photo)
        if(responsePhoto?.status !== 200){
          return setErrorMessage("couldn't process the image, you're too ugly")
        }
        const responseUpdate = await Api.updateUserInfo(decoded.id, userData)
        if(responseUpdate?.status !== 200){
          return setErrorMessage("Couldn't process your information, you're probably too much for this app 😐")
        }
        props.navigation.navigate('Login')
    }
    
  } 
  useEffect(() => {
  }, [date]);


const handleStep = ()=>{
    handleNextStep({currentStep, tasks, userData, setErrorMessage, setCurrentStep});
    const updatedTasks = [...tasks];
    updatedTasks.shift();
    setTasks(updatedTasks);
}
  
  const handleInputChange = (text: string) => {
    console.log(tasks)
    setUserData(prevState => ({
      ...prevState,
      [currentStep]: text,
    }));
  };

  const renderInput = () => {
    switch (currentStep) {
      case 'birthday':
        return <Birthday setDate={setDate} date={date} handleInputChange={handleInputChange}/>;
      case 'photo':
        return (
            <Photo selectedImage={selectedImage} setSelectedImage={setSelectedImage} handleInputChange={handleInputChange}/>
        );
      case 'targetDistanceRange':
        return <DistanceRange currentStep={currentStep} userData={userData} handleInputChange={handleInputChange}/>;
      case 'targetAgeRange':
        return <AgeRange handleInputChange={handleInputChange} 
        />
    case 'targetGender':case 'gender': 
        return <Gender currentStep={currentStep} setUserData={setUserData}/>
    case 'confirmData': 
        console.log('o:', userData.targetAgeRange)
        return (
            <ScrollView>
                <ConfirmationItem label='Description' value={userData.description} step='description' handleChange={handleChange}/>
                <ConfirmationItem label='Birthday' value={userData.birthday} step='birthday' handleChange={handleChange}/>
                <ConfirmationItem label='Photo' value={userData.photo} step='photo' handleChange={handleChange}/>
                <ConfirmationItem label='Gender' value={userData.gender} step='gender' handleChange={handleChange} />
                <ConfirmationItem label="Matches Distance" value={userData.targetDistanceRange} step="targetDistanceRange" handleChange={handleChange} />
                <ConfirmationItem label="Matches Gender" value={userData.targetGender} step="targetGender" handleChange={handleChange}/>
                <ConfirmationItem label="Matches age" value={userData.targetAgeRange} step="targetAgeRange" handleChange={handleChange}/>
            </ScrollView>                
        )
      default:
        return <Description handleInputChange={handleInputChange} userData={userData} currentStep={currentStep} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.presentation}>
        <Image source={logoImage} style={styles.logo} />
        <Text style={styles.welcome}>Complete your registration!</Text>
      </View>
      <View style={styles.interaction}>
        <View style={styles.inputArea}>
            {renderInput()}
        </View>
        {currentStep !== 'confirmData' ? (
        <TouchableOpacity style={styles.button} onPress={handleStep}>
            <Text style={styles.buttonText}>Next step</Text>
        </TouchableOpacity>
        ) : (
            <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                <Text style={styles.buttonText}>Confirm Data</Text>
            </TouchableOpacity>
        )}
      </View>
      {errorMessage !== '' && <ErrorMessage text={errorMessage}></ErrorMessage>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
    backgroundColor: '#222',
  },
  logo: {
    width: 25,
    height: 25,
  },
  presentation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputArea: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  welcome: {
    margin: 10,
    color: '#fff',
    fontSize: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  interaction: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#81d',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user,
  });
  
const mapDispatchToProps = (dispatch: Dispatch) => ({
    setUser: (payload: any) => dispatch(setUserAction(payload)),
});


export default connect(mapStateToProps, mapDispatchToProps)(RegisterCompletion);
