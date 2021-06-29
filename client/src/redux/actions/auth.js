import axios from 'axios';
import url from '../../utils/api';
import {
    REGISTER_FAIL,
    REGISTER_USER,
    AUTH_ERROR,
    USER_LOADED,
    UPDATE_PROFILE,
    LOGIN_USER,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE,
} from '../type';

import setAuthToken from '../../utils/setAuthToken';
import { getCurrProfile } from './profile';
import { setAlert } from './alert';

// Load User
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get(`${url}/api/auth`);
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
        dispatch(getCurrProfile());
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// Register User
export const register =
    ({ email, username, fullname, password }) =>
    async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const userBody = JSON.stringify({ email, username, password });
        const profileBody = JSON.stringify({ name: fullname });

        try {
            const userRes = await axios.post(`${url}/api/users`, userBody, config);
            dispatch({
                type: REGISTER_USER,
                payload: userRes.data,
            });
            dispatch(loadUser());

            const profileRes = await axios.post(
                '/api/profile',
                profileBody,
                config
            );

            dispatch({
                type: UPDATE_PROFILE,
                payload: profileRes.data.profile,
            });
        } catch (error) {
            const errors = error.response.data.errors;

            if (errors) {
                errors.forEach((err) => {
                    dispatch(setAlert(err.msg, 'danger'));
                });
            }
            dispatch({
                type: REGISTER_FAIL,
            });
        }
    };

// Login User

export const login =
    ({ email, password }) =>
    async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const body = JSON.stringify({ email, password });
        try {
            const res = await axios.post(`${url}/api/auth`, body, config);
            dispatch({
                type: LOGIN_USER,
                payload: res.data,
            });
            dispatch(loadUser());
        } catch (error) {
            const errors = error.response.data.errors;
            if (errors) {
                errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
            }

            dispatch({
                type: LOGIN_FAIL,
            });
        }
    };

// Logout User

export const logout = () => (dispatch) => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
};
