import axios from "axios";

const API_URL = 'http://localhost:1337';

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

export const postData = async (endpoint, data, token) => {
    try {
        const response = await axios.post(`${API_URL}/${endpoint}`, data, (token === null) ? {} : getAuthConfig(token));
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};