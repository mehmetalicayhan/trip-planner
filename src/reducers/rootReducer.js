
import { combineReducers } from 'redux';

import authReducer from './authReducer';
import mapReducer from './mapReducer';

let rootReducer = combineReducers({
    auth: authReducer,
    map:mapReducer
});

export default rootReducer;