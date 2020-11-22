import axios from 'axios';

export const updateTheme = (user) => {
    axios.put('/api/users/theme', user);
};