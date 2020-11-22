// errorReducer.js

import { SET_PROFILE_IMAGE } from '../actions/types';

const initialState = null;

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_PROFILE_IMAGE:
            return action.payload;
        default: 
            return state;
    }
}