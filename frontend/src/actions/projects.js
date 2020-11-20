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

            res.data.forEach(project => {
                switch(project) {
                    case project.workflow == 'in_progress':
                        projects['In Progress'].push(project);
                        break;
                    case project.workflow == 'completed':
                        projects['Completed'].push(project);
                        break;
                    default:
                        projects['Backlog'].push(project);
                        break;
                }

                if (project == res.data[res.data.length - 1]) {
                    dispatch(setProjects(projects));
                    resolve();
                }
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
            reject();
        });
    });
};

