import axios from 'axios';
import url from '../../utils/api';
import { setAlert } from './alert';
import {
    GET_PROFILE,
    PROFILE_ERROR,
    GET_CURR_PROFILE,
    UPDATE_PROFILE,
    GET_PROFILES
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
        console.log(error);
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
            dispatch(setAlert('Profile Updated', 'success'));
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

// Follow User
export const followUser =
    ({ id, username }) =>
    async (dispatch) => {
        try {
            await axios.put(`${url}/api/profile/add/following/${id}`);
            await axios.put(`${url}/api/profile/add/follower/${id}`);

            dispatch(getProfile(username));
            dispatch(getCurrProfile());
            dispatch(setAlert('Following User', 'success'));
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

// Unfollow User
export const unfollowUser =
    ({ id, username }) =>
    async (dispatch) => {
        try {
            await axios.put(`${url}/api/profile/delete/following/${id}`);
            await axios.put(`${url}/api/profile/delete/follower/${id}`);
            dispatch(getProfile(username));
            dispatch(getCurrProfile());
            dispatch(setAlert('Unfollowed User', 'success'));
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


// Get Profile By User Id
export const getProfileById = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`${url}/api/profile/user/id/${id}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data,
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: PROFILE_ERROR,
        });
    }
}

// Get Groups of profiles
export const getProfilesById = (idList) => async (dispatch) => {
    try {
        const savedProfiles = [];
        for (let i = 0; i < idList.length; i++) {
            const profile = await axios.get(`${url}/api/profile/user/id/${idList[i].user}`);
            savedProfiles.push(profile.data);
        }
        dispatch({
            type: GET_PROFILES,
            payload: savedProfiles,
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: PROFILE_ERROR,
        });
    }
};
