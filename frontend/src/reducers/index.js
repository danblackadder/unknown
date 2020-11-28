// index.js

import { combineReducers } from 'redux';
import errorReducer from './error';
import navigationReducer from './navigation';
import profileImageReducer from './profile_image';
import settingsReducer from './settings';
import boardReducer from './board';
import boardIdReducer from './board_id';

export default combineReducers({
    errors: errorReducer,
    navigation: navigationReducer,
    profile_image: profileImageReducer,
    settings: settingsReducer,
    board: boardReducer,
    board_id: boardIdReducer,
});