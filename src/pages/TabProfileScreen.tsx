import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Header from '../components/Header';
import { backendIP, backendPort } from '../apis/BackendAdress';
import { LoggedUser } from '../reducers/userReducer';
import { Dispatch } from 'redux';
import { RootState } from '../reducers';
import { connect } from 'react-redux';

interface Props  {
  user: LoggedUser
}
const TabProfileScreen = (props: Props) => {
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.profileContainer}>
                <Image
                    style={styles.profileImage}
                    source={{uri: `http://${backendIP}:${backendPort}/images/${props.user.photo}`}}
                />
                <Text style={styles.name}>{props.user.customName} - {props.user.age} years old</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#222',
    flex: 1
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

export default connect(mapStateToProps)(TabProfileScreen);