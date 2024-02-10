import { Profile } from "../../pages/TabProfileScreen";
import { genders } from "./HandleNextStep";


export class ValidateInput {
    value: Profile;
    setErrorMessage: any
    changed: any
    private isValid: boolean = true

    constructor(value: Profile, setErrorMessage: any, changed: any){
        this.value = value;
        this.setErrorMessage = setErrorMessage;
        

        console.log('validating descr', changed);

        if(changed.description) this.validateDescription();
        if(changed.gender || changed.targetGender)  this.validateGender();
        if(changed.age) this.validateAge();
        if(changed.distanceRange) this.validateDistanceRange()
    }
    
    validateDescription(){
        if (!this.value.description.trim() || this.value.description.length > 55) {
            this.setErrorMessage('Description must be between 1 and 55 characters');
            this.isValid = false
        } 
    }

    validateGender(){
        if (!genders.includes(this.value.gender)) {
            this.setErrorMessage('Invalid input for gender');
            this.isValid = false

        } 
    }

    validateAge(){
        const lowerAgeValue = parseInt(this.value.targetAgeRange.split('-')[0]);
        const upperAgeValue = parseInt(this.value.targetAgeRange.split('-')[1]);
        if(upperAgeValue < lowerAgeValue){
            this.setErrorMessage('the left age should be the lower')
            this.isValid = false
        }
        if (lowerAgeValue < 18 ||upperAgeValue < 18) {
            this.setErrorMessage('WHAT THE FUCK???');
            this.isValid = false
        } 
    }

    validateDistanceRange(){
        console.log(this.value.targetDistanceRange)
        const distanceRange = parseInt(this.value.targetDistanceRange);
        if (isNaN(distanceRange) || distanceRange < 10 || distanceRange > 1000000) {
            this.setErrorMessage('Target distance range must be a number between 10 and 1000000'); 
            this.isValid = false
        }
    }

    validationSuccedded(){
        return this.isValid
    }
}