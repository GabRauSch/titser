export interface Location {
    latitude: number,
    longitude: number
}

interface State {
    location: Location | null
}
interface Action {
    type: string; 
    payload?: any; 
}

export const setLocationAction = (payload: any) => ({
    type: 'SET_LOCATION',
    payload,
});


const initialState: State = {
    location: null
}

const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case 'SET_LOCATION':
            return {
                ...state, location: action.payload
            };
        default:
    }
    return state;
}

export default reducer;
