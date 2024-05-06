// api/userService.js
import axios from 'axios';

import apiConfig from './apiConfig';

const SpinGame = {

    // Function to create a new user
    getWinNumber: async (userData) => {
        try {
            console.log('createUser :: :: ',userData)
            const response = await axios.post(`${apiConfig.baseURL}api/spingGame/generateNumber`, userData);
            
            console.log('response.data ::::',response.data)
            return response.data; // Assuming the server responds with the created user data
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
};


export default SpinGame;
