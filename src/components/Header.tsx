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
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="bell" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconContainer}>
            <Icon name="cog" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#8Ee1f6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
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
