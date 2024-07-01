'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchData, postData } from 'src/services/api';

const MyAuthContext = createContext();

export const MyAuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authDetails, setAuthDetails] = useState(null);

  useEffect(() => {
    // localStorage.clear();
    const storedToken = localStorage.getItem('jwtToken');
    console.log('Stored token:', storedToken);
    if (storedToken) {
        const promise = fetchData('api/users/me?populate=posts', storedToken);
        console.log("Promise: ", promise);
        promise.then((data) => {
            console.log('User data fetched:', data);
            if(data.posts != undefined){
                data.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            }
            
            setUserData(data);
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
        const promise = postData('api/auth/local?populate=*', { identifier: email, password }, null);
        console.log("Promise: ", promise);
        promise.then(async (data) => {
            console.log(data);
            console.log('User data fetched:', data.user);
            // data.user.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            updateToken(data.jwt);
            const newUserData = await fetchData('api/users/me?populate=*', data.jwt);
            newUserData.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            updateUserData(newUserData);

        }).finally(() => {
            setLoading(false);
        }
        )

        // console.log(response);
        // updateToken(response.jwt);
        // updateUserData(response.user);
        // return response;
    } catch (error) {
        throw new Error(error);
    }
};

const register = async (data, role) => {
    try {
        // const response = await postData('api/auth/local/register', { email, username, password, roleType: role }, null);
        setLoading(true);
        const promise = postData('api/auth/local/register', { ...authDetails, ...data, roleType: role }, null);
        console.log("Promise: ", promise);
        promise.then(async (data) => {
            console.log(data);
            console.log('User data fetched:', data.user);
            // data.user.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            updateToken(data.jwt);
            const newUserData = await fetchData('api/users/me?populate=*', data.jwt);
            newUserData.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            updateUserData(newUserData);

        }).finally(() => {
            setLoading(false);
        }
        )
        // setToken(response.jwt);
        // setUserId(response.user.id);
        // setUserData(response.user);
        // updateToken(response.jwt);
        // updateUserData(response.user);
        // return response;
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
    <MyAuthContext.Provider value={{ token, userData, loading, updateToken, updateUserData, login, register, logout, authDetails, setAuthDetails }}>
      {children}
    </MyAuthContext.Provider>
  );
}

export const useMyAuthContext = () => useContext(MyAuthContext);