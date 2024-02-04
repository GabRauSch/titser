import React from 'react';
import { Provider } from 'react-redux';
import { View, StyleSheet, ImageBackground } from 'react-native';
import styles from './assets/styles/App'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import MainTab from './navigators/MainTab'
import Store from './store';
import Location from './helpers/location';

const App = () => {
  return (
    <Provider store={Store}>
      <Location></Location>
      <NavigationContainer>
        <MainTab />
      </NavigationContainer>
    </Provider>
  );
};
export default App;
