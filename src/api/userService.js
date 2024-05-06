// api/userService.js
import axios from 'axios';

import apiConfig from './apiConfig';

const userService = {
    getUsers: async () => {
        try {
            const response = await axios.get(`${apiConfig.baseURL}api/user/get`);
            console.log('response.data ::::', response.data)
            return response.data; // Assuming the server responds with the created user data
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },
    signInUser: async (userData) => {
        
        try {
            console.log('createUser :: :: signInUser',userData)
            const response = await axios.post(`${apiConfig.baseURL}api/user/sign-up`, userData);
            console.log('response.data ::::',response.data)
            return response.data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

};

export default userService;
