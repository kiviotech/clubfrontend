/* import { postData, setToken, setUserData, setUserId } from "./api";
import { useMyAuthContext } from "./my-auth-context";

export const login = async (email, password) => {
    const { updateToken, updateUserData } = useMyAuthContext();
    try {
        console.log('email', email);
        console.log('password', password);
        const response = await postData('api/auth/local', { identifier: email, password }, false);
        // setToken(response.jwt);
        // setUserId(response.user.id);
        // setUserData(response.user);
        updateToken(response.jwt);
        updateUserData(response.user);
        return response;
    } catch (error) {
        throw new Error(error);
    }
};

export const register = async (email, username, password, role) => {
    try {
        const response = await postData('api/auth/local/register', { email, username, password, roleType: role }, false);
        // setToken(response.jwt);
        // setUserId(response.user.id);
        // setUserData(response.user);
        updateToken(response.jwt);
        updateUserData(response.user);
        return response;
    } catch (error) {
        throw new Error(error);
    }
} */