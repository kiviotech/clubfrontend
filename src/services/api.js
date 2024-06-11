import axios from "axios";

const API_URL = 'http://localhost:1337';

let token = '';

export const setToken = (newToken) => {
    token = newToken;
};

const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(`${API_URL}/${endpoint}`, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

export const postData = async (endpoint, data) => {
    try {
        const response = await axios.post(`${API_URL}/${endpoint}`, data, getAuthConfig());
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};