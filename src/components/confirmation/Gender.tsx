import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from '../../assets/styles/components/confirmation/gender'
import { useState } from "react";

const genders = ['Male', 'Female', 'Other', 'Sensient Alien Robot']

type Step = 'description' | 'birthday' | 'photo' | 'gender' | 'targetDistanceRange' |  'targetGender' | 'targetAgeRange' | 'confirmData';
type UserData = {
    [key in Step]: string;
  };
  
interface Props {
  currentStep: Step,
  setUserData: any
}

export default ({currentStep, setUserData}: Props)=>{
    const [selectedGender, setSelectedGender] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const handleGenderChange = (gender: string) => {
        setSelectedGender(gender);
        setModalVisible(false);
        setUserData((prevState: any) => ({
            ...prevState,
            [currentStep]: gender,
        }));
      };
  return (
    <>
        {currentStep == 'targetGender' && <Text style={styles.rangeText}>Select the gender of your matches!</Text> }
        <TouchableOpacity style={styles.modalInput} onPress={() => setModalVisible(true)}>
            <Text style={styles.placeholder}>{selectedGender || 'Select Gender'}</Text>
        </TouchableOpacity>

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {genders.map((gender, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.modalItem}
                        onPress={() => handleGenderChange(gender)}
                    >
                        <Text style={styles.modalItemText}>{gender}</Text>
                    </TouchableOpacity>
                    ))}
                </View>
            </View>
        </Modal>
        </>
  )
}