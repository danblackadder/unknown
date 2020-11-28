import axios from 'axios';
import { GET_ERRORS } from './types';
import { setBoard } from './board';

export const createProject = (project) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        axios.post(`/api/projects/`, project)
        .then(res => {
            var project = res.data;
            var board = Object.assign({}, getState().board);
            board[project.workflow][project.index] = project;
            dispatch(setBoard(board));
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

export const updateProject = (project) => dispatch => {
    return new Promise((resolve, reject) => {
        axios.put(`/api/projects/${project._id}`, project)
        .then(() => {
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