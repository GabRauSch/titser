import { combineReducers } from "redux";
import peopleReducer from './peopleReducer';
import userReducer from './userReducer';
import locationReducer from './locationReducer';
import likesReducer from './likesReducer';
import userLikesReducer from './userLikesReducer';
import dislikesReducer from './dislikesReducer'


const rootReducer = combineReducers({
    peopleReducer, userReducer, locationReducer,
    likesReducer, userLikesReducer, dislikesReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
