
import { SET_NAVIGATION } from './types';

export const setNavigation = decoded => {
    return {
        type: SET_NAVIGATION,
        payload: decoded,
    };
};

