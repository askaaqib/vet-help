// index.js

import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import petsReducer from './petsReducer';
import usersReducer from './admin/usersReducer';

export default combineReducers({
    errors: errorReducer,
    auth: authReducer,
    pets: petsReducer,
    users: usersReducer
});