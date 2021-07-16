import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import savedpost from './savedposts';

const rootReducer = combineReducers({ alert, auth, profile, post, savedpost });

export default rootReducer;
