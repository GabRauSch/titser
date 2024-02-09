import { Text, TextInput } from "react-native";
import styles from '../../assets/styles/components/confirmation/description'

interface Props {
  setDate: (text: string)=>void,
  date: string,
  handleInputChange: (text: string)=>void
}

export default ({setDate, date, handleInputChange}: Props)=>{

    const handleDateChange = (text: string) => {
        const formattedText = text.replace(/\D/g, '').slice(0, 8); 
        const month = formattedText.slice(0, 2);
        const day = formattedText.slice(2, 4);
        const year = formattedText.slice(4, 8);

        let formattedDate = '';
        if (month) formattedDate += month;
        if (day) formattedDate += '/' + day;
        if (year) formattedDate += '/' + year;

        setDate(formattedDate);
        handleInputChange(formattedDate)
    };  
  return (
    <TextInput
        style={styles.input}
        placeholder="MM/DD/YYYY"
        placeholderTextColor="#ccc"
        value={date}
        onChangeText={(text: string) => { handleDateChange(text) }}
        keyboardType="numeric"
    />
  )
}