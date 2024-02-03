export interface LoggedUser {
    id: number,
    customName: string,
    description: string,
    photo: any,
    age: number,
    targetAgeRange: number[],
    tagetGender: string,
    targetDistanceRange: number,

}

interface State {
    user: LoggedUser
}
interface Action {
    type: string; 
    payload?: any; 
}

const initialState: State = {
    user: {id:21, customName: 'guest', description: 'null', photo: 'a', age: 0, targetAgeRange: [18, 27], tagetGender: 'female', targetDistanceRange: 300000}
}

const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            };
        default:
    }
    return state;
}

export default reducer;
