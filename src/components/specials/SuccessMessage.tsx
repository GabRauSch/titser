import { StyleSheet, Text } from "react-native"
import { styles } from "../../assets/styles/components/specials/SuccessMessage"

interface Props {
    text: string
}
const SuccessMessage = (props: Props)=>{
    return (
        <Text style={styles.errorText}>{props.text}</Text>
    )
}

export default SuccessMessage