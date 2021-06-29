import axios from 'axios';
import url from '../../utils/api';
import { setAlert } from './alert';
import {
    GET_PROFILE,
    PROFILE_ERROR,
    GET_CURR_PROFILE,
    UPDATE_PROFILE,
} from '../type';

// Fetch Profile
export const getProfile = (username) => async (dispatch) => {
    try {
        const res = await axios.get(`${url}/api/profile/user/${username}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach((err) => {
                dispatch(setAlert(err.msg, 'danger'));
            });
        }
        dispatch({
            type: PROFILE_ERROR,
        });
    }
};

// Get Curr Profile
export const getCurrProfile = () => async (dispatch) => {
    try {
        const res = await axios.get(`${url}/api/profile/`);
        dispatch({
            type: GET_CURR_PROFILE,
            payload: res.data,
        });
    } catch (error) {
        console.log(error);
        const errors = error.response.data.errors;
        
        if (errors) {
            errors.forEach((err) => {
                dispatch(setAlert(err.msg, 'danger'));
            });
        }
        dispatch({
            type: PROFILE_ERROR,
        });
    }
};

// UpdateProfile

export const updateProfile =
    ({ fullname, bio, profileImg }) =>
    async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const body = JSON.stringify({ name: fullname, bio, profileImg });

        try {
            const res = await axios.post(`${url}/api/profile`, body, config);
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data.profile,
            });
            dispatch(setAlert('Profile Updated','success'))
        } catch (error) {
            const errors = error.response.data.errors;

            if (errors) {
                errors.forEach((err) => {
                    dispatch(setAlert(err.msg, 'danger'));
                });
            }
            dispatch({
                type: PROFILE_ERROR,
            });
        }
    };
