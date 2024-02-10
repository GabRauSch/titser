import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import * as Api from '../../apis/Titser';
import ErrorMessage from '../../components/specials/ErrorMessage';
import { StackNavigationProp } from '@react-navigation/stack';
import SuccessMessage from '../../components/specials/SuccessMessage';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { LoggedUser, setUserAction, setUserNameAction } from '../../reducers/userReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decodeToken } from '../../apis/Token';

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  ConfirmationCode: undefined
};

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
  setCustomName: (payload: string)=>void,
  setUser: (payload: LoggedUser)=>void
};

const Register: React.FC<Props> = ({ navigation, setCustomName, setUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const logoImage = require('../../assets/images/titserLogo.png');

  useEffect(() => {
    const userToken= async ()=>{
      const token = await AsyncStorage.getItem('userToken');
      if(!token) return 

      const decodedToken = decodeToken(token);
      if(decodedToken.id){
        const userInfo = await Api.retrieveUserData(decodedToken.id);
        if(!userInfo.data){
          return setErrorMessage('failed to login, try again')
        } 
        setUser(userInfo.data)
      }
    }
    userToken()
  }, []);

  const redirectToLogin = () => {
    navigation.navigate('Login');
  };
  const redirectToConfirmationCode = ()=>{
    navigation.navigate('ConfirmationCode')
  }

  const handleRegister = async () => {
    if (username === '' || email === '' || password === '') {
      setErrorMessage('Please fill in all fields');
      return;
    }

    if (username.length < 4 || username.length > 12) {
      setErrorMessage('Username must be between 4 and 12 characters');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    const isEmailTaken = await Api.checkEmailAvailability(email);
    if (isEmailTaken.status !== 200) {
      setErrorMessage('Email is already taken');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return;
    }

    const registerAttempt = await Api.register(email, password, username);
    if(registerAttempt.status !==200){
      setErrorMessage("Something wen't wrong with the register")
    } else{
      setCustomName(username)
      await AsyncStorage.setItem('userToken', registerAttempt.data.token);
      redirectToConfirmationCode()
    }
  };

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />
      <Text style={styles.welcome}>Welcome to Titser!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={'#ccc'}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={'#ccc'}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={'#ccc'}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {errorMessage !== '' && <ErrorMessage text={errorMessage}></ErrorMessage>}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <Text style={styles.loginText} onPress={redirectToLogin}>Are you already a virgin?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  logo: {
    width: 100,
    height: 100,
  },
  welcome: {
    color: '#fff',
    marginBottom: 100,
    fontSize: 24,
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
  button: {
    backgroundColor: '#81d',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  loginText:{
    marginTop: 35,
    fontSize: 14,
    textDecorationLine: 'underline',
    fontWeight: '600',
    letterSpacing: 1.3,
    color: '#fff'
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setCustomName: (payload: string) => dispatch(setUserNameAction(payload)),
  setUser: (payload: LoggedUser)=> dispatch(setUserAction(payload))
});

export default connect(null, mapDispatchToProps)(Register);
