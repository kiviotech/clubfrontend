import { postData, setToken } from "./api";

export const login = async (email, password) => {
    try {
        const response = await postData('api/auth/local', { identifier: email, password });
        setToken(response.jwt);
        return response;
    } catch (error) {
        throw new Error(error);
    }
};

export const register = async (email, username, password) => {
    try {
        const response = await postData('api/auth/local/register', { email, username, password });
        setToken(response.data.jwt);
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}