import axios from "axios";

const API_URL = 'http://localhost:1337';

let token = null;
let userId = null;
let userType = null;

export const getToken = () => {
    return token || localStorage.getItem('jwtToken');
}

export const setToken = (newToken) => {
    token = newToken;
    localStorage.setItem('jwtToken', token);
};

export const getUserId = () => {
    return userId || localStorage.getItem('userId');
}

export const setUserId = (newUserId) => {
    userId = newUserId;
    localStorage.setItem('userId', userId);
}

export const getUserType = () => {
    return userType || localStorage.getItem('userType');
}

export const setUserType = (newUserType) => {
    userType = newUserType;
    localStorage.setItem('userType', userType);
}

export const initUserData = () => {
    token = getToken();
    userId = getUserId();
    userType = getUserType();
}

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