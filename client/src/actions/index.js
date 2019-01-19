import axios from 'axios';

import { AUTH_USER, AUTH_ERROR } from './types';

// because using redux thunk, action creator can return a function (vs just an action(type/payload))
// Returning a function lets us dispatch as many actions as we like
export const signup = (formProps,callback) => async (dispatch) => {
    console.log("signup action");
    try {
        const response = await axios.post('http://localhost:3090/signup', formProps);
        dispatch({ type: AUTH_USER, payload: response.data.token});
        localStorage.setItem('token',response.data.token);
        callback();
    }
    catch (e) {
       dispatch ({ type: AUTH_ERROR, payload: 'Email in use'}) 
    }
};

export const signin = (formProps,callback) => async (dispatch) => {
    console.log("signup action");
    try {
        const response = await axios.post('http://localhost:3090/signin', formProps);
        dispatch({ type: AUTH_USER, payload: response.data.token});
        localStorage.setItem('token',response.data.token);
        callback();
    }
    catch (e) {
       dispatch ({ type: AUTH_ERROR, payload: 'Invalid Login'}) 
    }
};

export const signout = () => {
    localStorage.removeItem('token');

    return {
        type: AUTH_USER,
        payload: ''
    }
}