// index.js

import { combineReducers } from 'redux';
import errorReducer from './error';
import navigationReducer from './navigation';
import profileImageReducer from './profile_image';
import settingsReducer from './settings';
import boardsReducer from './board';

export default combineReducers({
    errors: errorReducer,
    navigation: navigationReducer,
    profile_image: profileImageReducer,
    settings: settingsReducer,
    board: boardsReducer
});