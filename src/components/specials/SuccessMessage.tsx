import { StyleSheet, Text } from "react-native"

interface Props {
    text: string
}
const SuccessMessage = (props: Props)=>{
    return (
        <Text style={styles.errorText}>{props.text}</Text>
    )
}

const styles = StyleSheet.create({
  errorText: {
    padding: 15,
    borderRadius: 10,
    position: 'absolute',
    backgroundColor: 'rgba(0, 140, 0, .5)',
    color: 'white',
    top: 60,
  },
})

export default SuccessMessage