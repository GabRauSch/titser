import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
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
    },
    age: {
      color: '#555',
    },
    description: {
      marginTop: 5,
      color: '#777',
    },
  });

  export default styles