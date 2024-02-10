import { StyleSheet, Text, View } from "react-native"

interface Props {
    text: string
}
const ErrorMessage = ({text}: Props)=>{
    return (
        <View style={styles.errorMessage}>
          <Text style={styles.errorText}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  errorMessage: {
    position: 'absolute',
    top: 60,
    width: '100%',
    padding: 10
  },
  errorText: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(140, 0, 0, .5)',
    color: 'white',
    
  },
})

export default ErrorMessage