import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/titserLogo.png")} 
              style={{width: 40, height: 40}}
            />
        </View>
        <Text style={styles.titser}>Titser</Text>
        {/* 
        FOR THE FUTURE <-- Don't do this kids
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="bell" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="cog" size={22} color="white" />
          </TouchableOpacity>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#a0f',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  titser: {
    padding: 20,
    fontSize: 20,
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    position: 'absolute'
  },
  logoText: {
    marginLeft: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconContainer: {
    padding: 10,
  },
  iconsContainer:{
    display: 'flex',
    flexDirection: 'row'
  }
});

export default Header;
