import {Text, View } from "react-native"
import { styles } from "../../assets/styles/components/specials/ErrorMessage"

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

export default ErrorMessage