import { Text, TextInput } from "react-native";
import styles from '../../assets/styles/components/confirmation/description'
import { Step, UserData } from "../../pages/auth/RegisterCompletation";

interface Props {
  handleInputChange: (text: string)=>void 
  userData: UserData,
  currentStep: Step
}

export default ({handleInputChange, userData, currentStep}: Props)=>{
  return (
    <TextInput
        style={styles.input}
        placeholder={'Description'}
        placeholderTextColor={'#ccc'}
        value={userData[currentStep]}
        onChangeText={handleInputChange}
      />
  )
}