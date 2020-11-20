// index.js

import { combineReducers } from 'redux';
import errorReducer from './error';
import projectsReducer from './project';

export default combineReducers({
    errors: errorReducer,
    projects: projectsReducer
});