export interface LoggedUser {
    id: number,
    customName: string,
    description: string,
    photo: any,
    age: number,
    gender: string,
    targetAgeRange: number[],
    targetGender: string,
    targetDistanceRange: number,
    token: string
}

interface State {
    user: LoggedUser
}
interface Action {
    type: string; 
    payload?: any; 
}

export const setUserAction = (payload: any)=>({
    type: 'SET_USER',
    payload
})

export const setUserNameAction = (payload: any) => ({
    type: 'SET_USER_NAME',
    payload,
});

const initialState: State = {
    user: {id: 0, customName: 'guest', gender: '', description: 'Make a great description!', photo: 'null', age: 18, targetAgeRange: [], targetGender: 'milfs', targetDistanceRange: 0, token: ''}
}

const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            };
        case 'SET_USER_NAME': 
            return{
                ...state,
                user: {...state.user, customName: action.payload}
            }
        default:
    }

    return state;
}

export default reducer;
