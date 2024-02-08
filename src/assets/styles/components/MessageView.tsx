import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    messageView: {
      backgroundColor: "#222",
      position: 'absolute',
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    messageViewText:{
      color: '#fff',
      fontSize: 16,
      backgroundColor: '#000',
      padding: 10,
      borderRadius: 10
    }
  });
  
export default styles