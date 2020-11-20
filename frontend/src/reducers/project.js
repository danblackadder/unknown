// errorReducer.js

import { SET_PROJECTS } from '../actions/types';

const initialState = {
    'Backlog': [],
    'In Progress': [],
    'Completed': []
};

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_PROJECTS:
            return action.payload;
        default: 
            return state;
    }
}