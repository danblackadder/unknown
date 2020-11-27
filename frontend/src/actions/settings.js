import axios from 'axios';
import { GET_ERRORS, SET_PROFILE_IMAGE, SET_SETTINGS } from './types';

export const uploadProfileImage = (file) => dispatch => {
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

export const getSettings = () => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get('/api/users/settings')
        .then(res => {
            dispatch(setSettings(res.data));
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

export const updateSettings = (user) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put('/api/users/settings', user)
        .then(res => {
            dispatch(setSettings(res.data));
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

export const setSettings = decoded => {
    return {
        type: SET_SETTINGS,
        payload: decoded
    };
};