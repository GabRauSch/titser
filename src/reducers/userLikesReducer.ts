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

const initialState: State = {
    userLikes: []
}
export const setUserLikesAction = (payload: any) => ({
    type: 'SET_USER_LIKES', 
    payload,
  });
  
  const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
      case 'SET_USER_LIKES':
        const newLikes = action.payload; 
        if (newLikes) {
          const uniqueNewLikes = newLikes.filter((like: UserLikes) => {
            return !state.userLikes.some(existingLike => existingLike.id === like.id);
          });
          const newState = {
            ...state,
            userLikes: [...state.userLikes, ...uniqueNewLikes]
          };
          console.log(newState);
          return newState
        }
      default:
    }
    console.log('return states')
    return state;
  }
export default reducer;
