// index.js

import { combineReducers } from 'redux';
import errorReducer from './error';
import navigationReducer from './navigation';
import projectsReducer from './project';

export default combineReducers({
    errors: errorReducer,
    navigation: navigationReducer,
    projects: projectsReducer
});