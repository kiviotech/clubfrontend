'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchData, postData } from 'src/services/api';

const MyAuthContext = createContext();

export const MyAuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // localStorage.clear();
    const storedToken = localStorage.getItem('jwtToken');
    console.log('Stored token:', storedToken);
    if (storedToken) {
        const promise = fetchData('api/users/me', storedToken);
        console.log("Promise: ", promise);
        promise.then((data) => {
            setUserData(data);
            console.log('User data fetched:', data);
        }).finally(() => {
            setLoading(false);
        })
        setToken(storedToken);
    } else {
        setLoading(false);
    }
  }, []);

  const updateToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('jwtToken', newToken);
  };

  const updateUserData = (newUserData) => {
    setUserData(newUserData);
  };

  const login = async (email, password) => {
    try {
        console.log('email', email);
        console.log('password', password);
        const response = await postData('api/auth/local', { identifier: email, password }, null);
        console.log(response);
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

const register = async (email, username, password, role) => {
    try {
        const response = await postData('api/auth/local/register', { email, username, password, roleType: role }, null);
        // setToken(response.jwt);
        // setUserId(response.user.id);
        // setUserData(response.user);
        updateToken(response.jwt);
        updateUserData(response.user);
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

  return (
    <MyAuthContext.Provider value={{ token, userData, loading, updateToken, updateUserData, login, register }}>
      {children}
    </MyAuthContext.Provider>
  );
}

export const useMyAuthContext = () => useContext(MyAuthContext);