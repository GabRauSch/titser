import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import * as Api from '../../apis/Titser';
import ErrorMessage from '../../components/specials/ErrorMessage';
import { StackNavigationProp } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import { LoggedUser, setUserAction } from '../../reducers/userReducer';
import { Dispatch } from 'redux';
import { styles } from '../../assets/styles/pages/auth/ConfirmationCode';

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  ConfirmationCode: undefined,
  RegisterCompletation: undefined
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
        return setErrorMessage("Code is incorrect! Verify if you have the more recent code")
    } else {
        navigation.navigate('RegisterCompletation')
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

const mapStateToProps = (state: RootState) => ({
    user: state.userReducer.user,
  });
  
  const mapDispatchToProps = (dispatch: Dispatch) => ({
    setUser: (payload: any) => dispatch(setUserAction(payload)),
  });

  
  export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationCodePage);