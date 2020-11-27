// errorReducer.js

import { SET_SETTINGS } from '../actions/types';

const initialState = {
    first_name: '',
    last_name: '',
    email: ''
};

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_SETTINGS:
            return action.payload;
        default: 
            return state;
    }
}