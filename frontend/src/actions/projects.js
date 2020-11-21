import axios from 'axios';
import { GET_ERRORS, SET_PROJECTS } from './types';

export const setProjects = decoded => {
    return {
        type: SET_PROJECTS,
        payload: decoded,
    };
};

export const getProjects = () => dispatch => {
    return new Promise((resolve, reject) => {
        axios.get('/api/projects/')
        .then(res => {
            const projects = {
                'Backlog': [],
                'In Progress': [],
                'Completed': []
            };

            if (res.data.length > 0) {
                res.data.forEach(project => {
                    projects[project.workflow].push(project);

                    if (project == res.data[res.data.length - 1]) {
                        dispatch(setProjects(projects));
                        resolve();
                    }
                });
            } else {
                dispatch(setProjects(projects));
                resolve();
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

export const createProject = (project) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        axios.post('/api/projects', project)
        .then((res) => {
            let projects = Object.assign({}, getState().projects);
            projects[project.workflow].push(res.data);
            dispatch(setProjects(projects));
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

export const editProject = (id, project) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        axios.put(`/api/projects/${id}`, project)
        .then((res) => {
            let projects = Object.assign({}, getState().projects);
            let projectIndex, workflow;
            Object.keys(projects).map(tempWorkflow => {
                let tempIndex = projects[tempWorkflow].findIndex(value => {
                    return value._id == res.data._id;
                });
                if (tempIndex != -1) {
                    projectIndex = tempIndex;
                    workflow = tempWorkflow;
                };
            });
            if (workflow == res.data.workflow) {
                projects[workflow][projectIndex] = res.data;
            } else {
                let updatedWorkflow = projects[workflow].filter(value => {
                    return value._id != res.data._id;
                });
                projects[workflow] = updatedWorkflow;
                projects[res.data.workflow].push(res.data);
            };
            dispatch(setProjects(projects));
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

export const deleteProject = (project) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        axios.delete(`/api/projects/${project._id}`)
        .then(() => {
            let projects = Object.assign({}, getState().projects);
            let updatedWorkflow = projects[project.workflow].filter(value => {
                return value._id != project._id;
            });
            projects[project.workflow] = updatedWorkflow;
            dispatch(setProjects(projects));
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