export interface Dislike {
    id: number,
    customName: string,
    age: number,
    photo: string,
    interactionResponse: string
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
            const newLikes = action.payload; 
            if(newLikes){
                const uniqueNewLikes = newLikes.filter((like: Dislike) => {
                    return !state.dislikes.some(existingLike => existingLike.id === like.id);
                });
    
                return {
                    ...state,
                    dislikes: [...state.dislikes, ...uniqueNewLikes]
                };
            }
            break;

        default:
    }
    return state;
}

export default reducer;
