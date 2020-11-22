import axios from 'axios';
import { GET_ERRORS, SET_PROFILE_IMAGE } from './types';

export const uploadProfileImage = (file) => dispatch => {
    console.log(file);
    return new Promise((resolve, reject) => {
        axios.put('/api/users/image', file, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(res => {
            dispatch(setProfileImage(res.data));
            resolve();
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
            reject(err);
        });
    });
};

export const setProfileImage = decoded => {
    return {
        type: SET_PROFILE_IMAGE,
        payload: decoded,
    };
};