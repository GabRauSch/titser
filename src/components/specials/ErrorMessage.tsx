import { StyleSheet, Text } from "react-native"

interface Props {
    text: string
}
const ErrorMessage = (props: Props)=>{
    return (
        <Text style={styles.errorText}>{props.text}</Text>
    )
}

const styles = StyleSheet.create({
  errorText: {
    padding: 20,
    borderRadius: 10,
    position: 'absolute',
    backgroundColor: 'rgba(140, 0, 0, .5)',
    color: 'white',
    top: 60,
  },
})

export default ErrorMessage