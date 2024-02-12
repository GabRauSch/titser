import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
        borderWidth: 1,
        marginTop: 20,
        margin: 10,
        borderRadius: 6,
        minWidth: 150, 
        borderColor: 'gold',
        flexDirection: 'column',
      },
      photo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 10,
      },
      infoContainer: {
        marginLeft: 10,
      },
      name: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
      }
  });

  export default styles