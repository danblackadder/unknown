// authentication.js

import axios from 'axios';
import { GET_ERRORS } from './types';
import { setNavigation } from './navigation';
import Cookie from "js-cookie";

export const register = (user, history) => dispatch => {
    return new Promise((resolve, reject) => {
        axios
        .post('/api/users/register', user)
        .then(() => {
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

export const login = (user, history) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.post('/api/users/login', user)
        .then(res => {
            Cookie.set("token", res.data.token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cookie.get('token');
            dispatch(setNavigation('dashboard'));
            history.push('/dashboard'); 
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
