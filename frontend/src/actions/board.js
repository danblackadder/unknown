import axios from 'axios';
import { GET_ERRORS, SET_BOARD, SET_BOARD_ID } from './types';

export const setBoard = decoded => {
    return {
        type: SET_BOARD,
        payload: decoded,
    };
};

export const setBoardId = decoded => {
    return {
        type: SET_BOARD_ID,
        payload: decoded,
    };
};

export const getBoard = () => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get(`/api/boards/`)
            .then(res => {
                console.log(res.data);
                if (res.data) {
                    dispatch(setBoard(res.data.projects));
                    dispatch(setBoardId(res.data._id));
                    resolve();
                } else {
                    createBoard(dispatch)
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
                }
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

export const createBoard = (dispatch) => {
    return new Promise((resolve, reject) => {
        axios.post(`/api/boards/`)
            .then(res => {
                dispatch(setBoard(res.data.projects));
                dispatch(setBoardId(res.data._id));
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

export const updateBoard = (board) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        syncBoard(board, dispatch, getState)
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

export const syncBoard = (board, dispatch, getState) => {
    return new Promise((resolve, reject) => {
        var board_id = getState().board_id;
        axios.put(`/api/boards/${board_id}`, board)
            .then(res => {
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