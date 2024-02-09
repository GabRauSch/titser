import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dispatch, SetStateAction } from "react";
import * as ImagePicker from 'expo-image-picker';

const genders = ['Male', 'Female', 'Other', 'Sensient Alien Robot'];

type Step = 'description' | 'birthday' | 'photo' | 'gender' | 'targetDistanceRange' | 'targetGender' | 'targetAgeRange' | 'confirmData';
type UserData = {
  [key in Step]: string;
};

interface Props {
  label: string;
  value: string | string[] | any;
  handleChange: (step: Step) => void;
  step: Step; 
}

export default ({ label, value, handleChange, step }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.textArea}>
          <Text style={styles.label}>{label}</Text>
          {step === 'photo' ? (
            <Image
              source={{ uri: value }}
              style={{ width: 300, height: 300 }}
            />
          ) : (
            <>
              {step === 'targetAgeRange' ? (
                <View style={styles.ageRange}>
                  <Text style={styles.labelAgeValue}>{value.split('-')[0]}</Text>
                  <Text style={styles.labelAgeValue}>{value.split('-')[1]}</Text>
                </View>

              ) : (<Text style={styles.labelValue}>{value}</Text>)}

            </>
          )}
        </View>
        <TouchableOpacity style={styles.buttonChange} onPress={() => handleChange(step)}>
          <Text style={styles.buttonText}>Change</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  textArea: {
    padding: 10
  },
  label: {
    margin: 10,
    textAlign: 'center',
    color: '#fff',
    fontSize: 20
  },
  ageRange: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelAgeValue: {
    width: '40%',
    color: '#fff',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    padding: 10,
    margin: 10
  },
  buttonChange: {
    width: 300,
    backgroundColor: '#408',
    padding: 10,
    borderRadius: 10
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff'
  },
  labelValue: {
    color: '#fff',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    padding: 10,
    width: 300
  }
});
