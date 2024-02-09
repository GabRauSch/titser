import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from '../../assets/styles/components/confirmation/gender'
import { useEffect, useState } from "react";

const genders = ['Male', 'Female', 'Other', 'Sensient Alien Robot']

type Step = 'description' | 'birthday' | 'photo' | 'gender' | 'targetDistanceRange' |  'targetGender' | 'targetAgeRange' | 'confirmData';
type UserData = {
    [key in Step]: string;
  };
  
interface Props {
  handleInputChange: (text: string)=>void
}

export default ({ handleInputChange}: Props)=>{
  const [lowerAge, setLowerAge] = useState('18');
  const [upperAge, setUpperAge] = useState('99');

  useEffect(()=>{
    handleInputChange(`${lowerAge}-${upperAge}`)
  }, [])

  const handleLowerAgeChange = (text: string) => {
    setLowerAge(text);
};

const handleUpperAgeChange = (text: string) => {
    setUpperAge(text);
};
  return (
    <View style={styles.ageRangeInputArea}>
        <Text style={styles.rangeText}>Select the age of your matches!</Text>
        <View style={styles.inputContainer}>
            <Text style={styles.separator}>From: </Text>
            <TextInput
                style={styles.inputAge}
                onChangeText={(text)=>{handleLowerAgeChange(text); handleInputChange(`${text}-${upperAge}`)}}
                value={lowerAge}
                keyboardType="numeric"
            />
            <Text style={styles.separator}>to: </Text>
            <TextInput
                style={styles.inputAge}
                onChangeText={(text)=>{handleUpperAgeChange(text); handleInputChange(`${lowerAge}-${text}`)}}
                value={upperAge}
                keyboardType="numeric"
            />
        </View>
    </View>
  )
}