import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import * as Api from '../../apis/Titser';
import ErrorMessage from '../../components/specials/ErrorMessage';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { nextPersonAction } from '../../reducers/peopleReducer';
import { RootState } from '../../reducers';
import { LoggedUser, setUserAction } from '../../reducers/userReducer';
import { Dispatch } from 'redux';

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  ConfirmationCode: undefined
};

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ConfirmationCode'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
  user: LoggedUser,
  setUser: (props: any)=>void
};

const ConfirmationCodePage: React.FC<Props> = ({ navigation, user, setUser }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [confirmationCode, setConfirmationCode] = useState('');
  const logoImage = require('../../assets/images/titserLogo.png');

  const redirectToRegister = () => {
    navigation.navigate('Register');
  };

  const verifyCode = async () => {
    if (confirmationCode === '') {
      setErrorMessage('Fill all the fields, stupid!');
      return;
    }

    console.log(user.customName, confirmationCode)
    const confirm = await Api.registerConfirmation(user.customName, confirmationCode)
    if(confirm.status !== 200){
        return setErrorMessage("Couldn't confirm registration. Ensure code is correctly setted!")
    } else {
        setUser(confirm.data)
    }
  };


  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logo} />
      <Text style={styles.welcome}>Enter the code received in your email</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirmation code"
        placeholderTextColor={'#ccc'}
        value={confirmationCode}
        onChangeText={(text) => setConfirmationCode(text)}
      />
      {errorMessage !== '' && <ErrorMessage text={errorMessage}></ErrorMessage>}
      <TouchableOpacity style={styles.button} onPress={verifyCode}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.loginText} onPress={redirectToRegister}>Didn't receive a code?</Text>
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

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user,
  });
  
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    setUser: (payload: any) => dispatch(setUserAction(payload)),
  });

  
  export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationCodePage);