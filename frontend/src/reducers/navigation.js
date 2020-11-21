// errorReducer.js

import { SET_NAVIGATION } from '../actions/types';

const initialState = 'auth';

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_NAVIGATION:
            return action.payload;
        default: 
            return state;
    }
}