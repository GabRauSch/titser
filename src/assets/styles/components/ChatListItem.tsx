import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderWidth: 2,
      borderColor: '#ccc',
      margin: 10,
      borderRadius: 15
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
      fontWeight: 'bold',
      color: '#fff'
    },
    age: {
      color: '#555',
    },
    message: {
      marginTop: 5,
      color: '#777',
    },
    readButton:{
      height: 10,
      width: 10,
      borderRadius: 10,
      backgroundColor: 'green',
    }
  });

  export default styles