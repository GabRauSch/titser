export const genders = ['Male', 'Female', 'Other', 'Sensient Alien Robot']

export type Step = 'description' | 'birthday' | 'photo' | 'gender' | 'targetDistanceRange' |  'targetGender' | 'targetAgeRange' | 'confirmData';
export type UserData = {
    [key in Step]: string;
};
type Props = {
    currentStep: Step,
    tasks: any,
    userData: UserData,
    setErrorMessage: (text: string)=>void,
    setCurrentStep: (text: Step)=>void
}  

export const handleNextStep = ({currentStep, tasks, userData, setErrorMessage, setCurrentStep}: Props) => {
    const currentIndex = tasks.indexOf(currentStep);
    const userInput = userData[currentStep];
    console.log(userInput)
  
    switch (currentStep) {
      case 'description':
        if (!userInput.trim() || userInput.length > 55) {
          setErrorMessage('Description must be between 1 and 55 characters');
          return;
        }
        break;
      case 'birthday':
        const birthDate = new Date(userInput);
        const age = new Date().getFullYear() - birthDate.getFullYear();
        if (age < 18) {
          setErrorMessage('You must be at least 18 years old');
          return;
        }
        break;
      case 'gender':
      case 'targetGender':
        if (!genders.includes(userInput)) {
          setErrorMessage('Invalid input for gender');
          return;
        }
        break;
      case 'targetAgeRange': 
        const lowerAgeValue = parseInt(userData.targetAgeRange.split('-')[0]);
        const upperAgeValue = parseInt(userData.targetAgeRange.split('-')[1]);
        if(upperAgeValue < lowerAgeValue){
            return setErrorMessage('the left age should be the lower')
        }
        if (lowerAgeValue < 18 ||upperAgeValue < 18) {
            setErrorMessage('WHAT THE FUCK???');
            return;
        }
      break;
      case 'targetDistanceRange':
        const distanceRange = parseInt(userInput);
        if (isNaN(distanceRange) || distanceRange < 10 || distanceRange > 1000000) {
          setErrorMessage('Target distance range must be a number between 10 and 1000000');
          return;
        }
        break;
      case 'targetAgeRange':
        const [startAge, endAge] = userInput.split(',');
        console.log(startAge, endAge)
        if (isNaN(parseInt(startAge)) || isNaN(parseInt(endAge)) || parseInt(startAge) < 18 || parseInt(endAge) < 18) {
          setErrorMessage('Invalid input for target age range');
          return;
        }
        break;
      default:
        break;
    }
  
    setErrorMessage('');
  
    if (currentIndex < tasks.length - 1) {
      setCurrentStep(tasks[currentIndex + 1]);
    }
  };