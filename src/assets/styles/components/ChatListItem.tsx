import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderWidth: 1,
      marginTop: 20,
      borderRadius: 6
    },
    photo: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    infoContainer: {
      flex: 1,
    },
    name: {
      fontSize: 18,
      fontWeight: '700',
      color: '#fff'
    },
    age: {
      color: '#555',
    },
    message: {
      marginTop: 5,
      color: 'red',
    },
    readButton:{
      height: 10,
      width: 10,
      borderRadius: 10,
      backgroundColor: 'green',
    }
  });

  export default styles