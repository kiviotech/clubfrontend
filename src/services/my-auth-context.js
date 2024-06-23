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
        const promise = fetchData('api/users/me?populate=user_detail', storedToken);
        console.log("Promise: ", promise);
        promise.then((data) => {
            console.log('User data fetched:', data);
            // data.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setUserData(data.user_detail);
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
        // const response = await postData('api/auth/local', { identifier: email, password }, null);
        setLoading(true);
        const promise = postData('api/auth/local', { identifier: email, password }, null);
        console.log("Promise: ", promise);
        promise.then(async (data) => {
            console.log(data);
            console.log('User data fetched:', data.user);
            // data.user.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            updateToken(data.jwt);
            // const newUserData = await fetchData('api/users/me?populate=*', data.jwt);
            // newUserData.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            // updateUserData(newUserData);

        }).finally(() => {
            setLoading(false);
        })
    } catch (error) {
        throw new Error(error);
    }
};

const logout = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem('jwtToken');
}

  return (
    <MyAuthContext.Provider value={{ token, userData, loading, updateToken, updateUserData, login, logout }}>
      {children}
    </MyAuthContext.Provider>
  );
}

export const useMyAuthContext = () => useContext(MyAuthContext);