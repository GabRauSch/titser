import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 50,
      backgroundColor: '#222',
    },
    logo: {
      width: 25,
      height: 25,
    },
    presentation: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputArea: {
      flex: 1,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
    },
    welcome: {
      margin: 10,
      color: '#fff',
      fontSize: 17,
      alignItems: 'center',
      justifyContent: 'center',
    },
    interaction: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#81d',
      width: '80%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 50,
      borderRadius: 10,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
    },
  });