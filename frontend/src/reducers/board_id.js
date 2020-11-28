import { SET_BOARD_ID } from '../actions/types';

const initialState = null;

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_BOARD_ID:
            return action.payload;
        default: 
            return state;
    }
}