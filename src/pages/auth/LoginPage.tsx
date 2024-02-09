import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import * as Api from '../../apis/Titser';
import ErrorMessage from '../../components/specials/ErrorMessage';
import { StackNavigationProp } from '@react-navigation/stack';
import { Dispatch } from 'redux';
import { LoggedUser, setUserAction, setUserNameAction } from '../../reducers/userReducer';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import { decodeToken } from '../../apis/Token';
import AsyncStorage from '@react-native-async-storage/async-storage';


type RootStackParamList = {
  Register: undefined;
  Login: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
  user: LoggedUser;
  setUser: (payload: LoggedUser)=>void
};

const Login: React.FC<Props> = ({ navigation, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const logoImage = require('../../assets/images/titserLogo.png');


  useEffect(()=>{
    const checkUserState = async ()=>{
      // const token = await Api.login(email, password);
      // await secureStorage.setItem('userToken', token);
    }
    checkUserState();
  }, [])

  const redirectToRegister = () => {
    navigation.navigate('Register');
  };

  const handleLogin = async () => {
    console.log('login')
    if (email === '' || password === '') {
      console.error('no values')
      setErrorMessage('Fill all the fields, stupid!');
      return;
    }
    const loginAttempt = await Api.login(email, password);
    const token = loginAttempt.data.token;
    if(!token){
      console.error('no token')
      return setErrorMessage('Incorrect credentials')
    }
    await AsyncStorage.setItem('userToken', token);

    const {id: userId} = decodeToken(token);
    const userInfo = await Api.retrieveUserData(userId)    
    if(!userInfo.data){
      return setErrorMessage('failed to login, try again')
    } 
    setUser(userInfo.data)
  };


  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />
      <Text style={styles.welcome}>oh, you're already a user? I can stop pretending I care! Make your login and be fast</Text>
      <TextInput
        style={styles.input}
        placeholder="Email, I believe..."
        placeholderTextColor={'#ccc'}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password, and it's not hidden"
        placeholderTextColor={'#ccc'}
        secureTextEntry={false}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      {errorMessage !== '' && <ErrorMessage text={errorMessage}></ErrorMessage>}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>button text</Text>
      </TouchableOpacity>
      <Text style={styles.loginText} onPress={redirectToRegister}>Doesn't user are you have?</Text>
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
    fontSize: 18,
    padding: 10
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    color: '#fff',
  },
  button: {
    backgroundColor: '#ccc',
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

const mapStateToProps = (state: RootState) => ({
  user: state.userReducer.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setUser: (payload: LoggedUser)=> dispatch(setUserAction(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);