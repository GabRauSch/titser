export interface Like {
    id: number,
    customName: string,
    photo: string,
    age: number
}

interface State {
    likes: Like[]
}
interface Action {
    type: string; 
    payload?: any; 
}

export const setLikesAction = (payload: any) => ({
    type: 'SET_LIKES',
    payload,
});


const initialState: State = {
    likes: []
}

const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case 'SET_LIKES':
            return {
                ...state, likes: action.payload
            };
        default:
    }
    return state;
}

export default reducer;
