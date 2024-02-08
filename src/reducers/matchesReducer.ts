export interface Match {
    id: number,
    customName: string,
    photo: string,
    userIdTo: number
}

interface State {
    matches: Match[];
}

interface Action {
    type: string;
    payload?: any;
}

export const setMatchesAction = (payload: Match[]) => ({
    type: 'SET_MATCHES',
    payload,
});

export const removeMatchAction = (payload: number)=>({
    type: 'REMOVE_MATCH',
    payload
})

const initialState: State = {
    matches: [],
};

const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case 'SET_MATCHES':
            const newMatches = action.payload;

            if (newMatches) {
                const uniqueNewMatches = newMatches.filter((match: Match) => {
                    return !state.matches.some(existingMatch => existingMatch.id === match.id);
                });

                return {
                    ...state,
                    matches: [...state.matches, ...uniqueNewMatches],
                };
            }
            break;
        case 'REMOVE_MATCH': 
            const userIdToRemove = action.payload;
            const updatedMatches = state.matches.filter(match => match.userIdTo !== userIdToRemove);
        
            return {
                ...state,
                matches: updatedMatches
            };
        
        default:
            return state;
    }
    return state;
};

export default reducer;
