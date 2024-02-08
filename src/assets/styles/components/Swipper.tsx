import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    card: {
        flex: 1,
        aspectRatio: 0.8,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
      },
      photo: {
        width: '76%',
        height: '80%',
        borderRadius: 10,
        resizeMode: 'cover',
      },
      descriptionContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff'
      },
      descriptionText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        height: 40
      },
      actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
        width: 200
      },
      personPresentation: {
        fontSize: 32,
        color: "#fff"
      },
      actionButton: {
        padding: 15,
        aspectRatio: 1/1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: 'white',
      },
      descriptionTexts:{
        alignItems: 'flex-start',
        padding: 10
      }
  });
  
export default styles