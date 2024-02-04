export interface UserLikes {
    id: number,
    age: number,
    customName: string,
    photo: string,
    interactionResponse: string
}

interface State {
    userLikes: UserLikes[]
}
interface Action {
    type: string; 
    payload?: any; 
}

export const setUserLikesAction = (payload: any) => ({
    type: 'SET_USER_LIKE',
    payload,
});


const initialState: State = {
    userLikes: []
}

const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case 'SET_USER_LIKE':
            return {
                ...state, userLikes: action.payload
            };
        default:
    }
    return state;
}

export default reducer;
