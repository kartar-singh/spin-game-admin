// api/userService.js
import axios from 'axios';

import apiConfig from './apiConfig';

const probabilityService = {
    getProbability: async () => {
        try {
            const response = await axios.get(`${apiConfig.baseURL}api/probability/probability-list`);
            console.log('response.data ::::', response.data)
            return response.data; // Assuming the server responds with the created user data
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

};

export default probabilityService;
