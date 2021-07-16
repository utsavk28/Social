import axios from 'axios';
import url from '../../utils/api';
import { SAVED_POST_ERROR, GET_SAVED_POST, UPDATE_SAVED_POST } from '../type';
import { setAlert } from './alert';

export const getSavedPost = () => async (dispatch) => {
    try {
        const res = await axios.get(`${url}/api/posts/saved/all`);
        dispatch({
            type: GET_SAVED_POST,
            payload: res.data,
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: SAVED_POST_ERROR,
        });
    }
};

export const addSavedPost = (id) => async (dispatch) => {
    try {
        const res = await axios.put(`${url}/api/posts/saved/${id}`);
        dispatch({
            type: UPDATE_SAVED_POST,
            payload: res.data,
        });
        dispatch(setAlert('Post Saved', 'success'));
    } catch (error) {
        console.log(error);
        dispatch({
            type: SAVED_POST_ERROR,
        });
    }
};

export const removeSavedPost = (id) => async (dispatch) => {
    try {
        const res = await axios.put(`${url}/api/posts/saved/remove/${id}`);
        dispatch({
            type: UPDATE_SAVED_POST,
            payload: res.data,
        });
        dispatch(setAlert('Post Removed', 'success'));
    } catch (error) {
        console.log(error);
        dispatch({
            type: SAVED_POST_ERROR,
        });
    }
};
