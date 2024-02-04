export interface Dislike {
    id: number,
    customName: string,
    age: number,
    photo: string
}

interface State {
    dislikes: Dislike[]
}
interface Action {
    type: string; 
    payload?: any; 
}

export const setDislikesAction = (payload: any) => ({
    type: 'SET_DISLIKES',
    payload,
});


const initialState: State = {
    dislikes: []
}

const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case 'SET_DISLIKES':
            return {
                ...state, dislikes: action.payload
            };
        default:
    }
    return state;
}

export default reducer;
