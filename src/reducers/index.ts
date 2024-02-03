import { combineReducers } from "redux";
import peopleReducer from './peopleReducer';
import userReducer from './userReducer';
import locationReducer from './locationReducer';

const rootReducer = combineReducers({
    peopleReducer, userReducer, locationReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
