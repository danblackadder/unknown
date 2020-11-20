// authentication.js

import axios from 'axios';
import { GET_ERRORS } from './types';
import Cookie from "js-cookie";

export const register = (user, history) => dispatch => {
    return new Promise((resolve, reject) => {
        axios
        .post('/api/users/register', user)
        .then(() => {
            history.push('/auth');
            resolve();
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
            reject();
        });
    });
};

export const login = (user, history) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post('/api/users/login', user)
        .then(res => {
            Cookie.set("token", res.data.token);
            history.push('/'); 
            resolve();
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
            reject();
        });
    });
};

export const logout = history => dispatch => {
    delete axios.defaults.headers.common['Authorization'];
    Cookie.remove('token');
    history.push('/auth');
};
