import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import savedpost from './savedposts';
import chat from './chat';

const rootReducer = combineReducers({
    alert,
    auth,
    profile,
    post,
    savedpost,
    chat,
});

export default rootReducer;
