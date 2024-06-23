import axios from "axios";

export const API_URL = 'http://localhost:1337';

const getAuthConfig = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const fetchData = (endpoint, token) => {
    return axios.get(`${API_URL}/${endpoint}`, (token === null) ? {} : getAuthConfig(token))
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw new Error(error);
        });
};

export const postData = (endpoint, data, token) => {
    return axios.post(`${API_URL}/${endpoint}`, data, (token === null) ? {} : getAuthConfig(token))
        .then(response => response.data)
        .catch(error => {
            console.error(error);
            throw new Error(error);
        });
};

export const putData = async (endpoint, data, token) => {
    try {
        const response = await axios.put(`${API_URL}/${endpoint}`, data, (token === null) ? {} : getAuthConfig(token));
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};