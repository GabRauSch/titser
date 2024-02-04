export interface User {
    id: number
    customName: string,
    description: string,
    photo: any,
    age: number
}

interface State {
    people: User[]
}
interface Action {
    type: string; 
    payload?: any; 
}

export const retrieveAllAction = (payload: any) => (
    {
    type: 'RETRIEVE_ALL',
    payload,
});

export const nextPersonAction = ()=>({
    type: 'NEXT_PERSON'   
})

const initialState: State = {
    people: []
}

const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case 'RETRIEVE_ALL':
            return {
                ...state,
                people: [...state.people, ...action.payload]
            };
        case 'NEXT_PERSON':
            if(state.people.length == 1){
                return {
                    ...state,
                    people: []
                }
            } 
            return {
                ...state,
                people: state.people.slice(1)
            };

        default:
    }
    return state;
}

export default reducer;
