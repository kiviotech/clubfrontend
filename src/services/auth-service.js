import { postData, setToken, setUserId, setUserType } from "./api";

export const login = async (email, password) => {
    try {
        const response = await postData('api/auth/local', { identifier: email, password });
        setUserId(response.user.id);
        setUserType(response.user.roleType);
        setToken(response.jwt);
        return response;
    } catch (error) {
        throw new Error(error);
    }
};

export const register = async (email, username, password, role) => {
    try {
        const response = await postData('api/auth/local/register', { email, username, password, roleType: role });
        setUserId(response.user.id);
        setUserType(response.user.roleType);
        setToken(response.jwt);
        return response;
    } catch (error) {
        throw new Error(error);
    }
}