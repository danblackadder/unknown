import { SET_BOARD } from '../actions/types';

const initialState = {
    'Backlog': [],
    'In Progress': [],
    'Completed': []
};

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_BOARD:
            return action.payload;
        default: 
            return state;
    }
}