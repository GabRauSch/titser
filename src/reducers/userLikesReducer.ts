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
            const newLikes = action.payload; 
            if(newLikes){
                const uniqueNewLikes = newLikes.filter((like: UserLikes) => {
                    return !state.userLikes.some(existingLike => existingLike.id === like.id);
                });
    
                return {
                    ...state,
                    userLikes: [...state.userLikes, ...uniqueNewLikes]
                };
            }

                default:
    }
    return state;
}

export default reducer;
