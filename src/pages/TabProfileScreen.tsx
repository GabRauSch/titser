import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Header from '../components/Header';

const TabProfileScreen = () => {
    const profilePhoto = require('../assets/images/uus.jpg')
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.profileContainer}>
                <Image
                    style={styles.profileImage}
                    source={profilePhoto} // Replace with the actual image source
                />
                <Text style={styles.name}>John Doe</Text>
                <Text style={styles.age}>Age: 30</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    marginTop: 10,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  age: {
    marginTop: 5,
    fontSize: 16,
    color: '#888',
  },
});

export default TabProfileScreen;
