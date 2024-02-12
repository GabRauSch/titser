import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { styles } from '../assets/styles/components/Header';
type Props = {
  save?: boolean 
  handleSave?: ()=>void
}

const Header = ({save, handleSave}: Props) => {
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
        <TouchableOpacity onPress={()=>{handleSave ? handleSave() : null}}>
          <Text style={styles.save}>{save ? 'save' : ''}</Text>  
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
};

export default Header;
