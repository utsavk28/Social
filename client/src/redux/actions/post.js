import axios from 'axios';
import url from '../../utils/api';
import { setAlert } from './alert';
import {
    COMMENT_POST,
    DELETE_POST,
    GET_POST,
    GET_POSTS,
    LIKE_POST,
    POST_ERROR,
    POST_POST,
    UNLIKE_POST,
    GET_USERS_POSTS,
    DELETE_COMMENT,
} from '../type';

// Fetch All Posts
export const getAllPost = () => async (dispatch) => {
    try {
        const res = await axios.get(`${url}/api/posts/`);
        dispatch({
            type: GET_POSTS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
        });
    }
};

// Fetch Post By Id
export const getPostById = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`${url}/api/posts/${id}`);
        dispatch({
            type: GET_POST,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
        });
    }
};

// Fetch Posts By Group of Id
export const getPostsById = (idArr) => async (dispatch) => {
    try {
        const savedPosts = [];
        for (let i = 0; i < idArr.length; i++) {
            const post = await axios.get(`${url}/api/posts/${idArr[i]._id}`);
            savedPosts.push(post.data);
        }
        dispatch({
            type: GET_POSTS,
            payload: savedPosts,
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
        });
    }
};

// Fetch All Specific Users Posts
export const getUsersPost = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`${url}/api/posts/user/${id}`);
        dispatch({
            type: GET_USERS_POSTS,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
        });
    }
};

// Create Post
export const postPost =
    ({ text, img }) =>
    async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const body = JSON.stringify({ text, img });

        try {
            const res = await axios.post(`${url}/api/posts`, body, config);
            dispatch({
                type: POST_POST,
                payload: res.data,
            });
            dispatch(setAlert('Posted Successfully', 'success'));
        } catch (error) {
            const errors = error.response.data.errors;
            if (errors) {
                errors.forEach((err) => {
                    dispatch(setAlert(err.msg, 'danger'));
                });
            }
            dispatch({
                type: POST_ERROR,
            });
        }
    };

// Update Post
export const updatePost =
    ({ id, text, img }) =>
    async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const body = JSON.stringify({ text, img });

        try {
            const res = await axios.put(`${url}/api/posts/${id}`, body, config);
            dispatch({
                type: POST_POST,
                payload: res.data,
            });
            dispatch(setAlert('Post Updated Successfully', 'success'));
        } catch (error) {
            const errors = error.response.data.errors;
            if (errors) {
                errors.forEach((err) => {
                    dispatch(setAlert(err.msg, 'danger'));
                });
            }
            dispatch({
                type: POST_ERROR,
            });
        }
    };

// Delete Post
export const deletePost = (id) => async (dispatch) => {
    try {
        await axios.delete(`${url}/api/posts/${id}`);
        dispatch({
            type: DELETE_POST,
            payload: id,
        });
        dispatch(setAlert('Post Deleted Successfully', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERROR,
        });
    }
};

// Like Post
export const likePost = (id) => async (dispatch) => {
    try {
        const res = await axios.put(`${url}/api/posts/like/${id}`);
        dispatch({
            type: LIKE_POST,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
        });
    }
};

// Unlike Post
export const unlikePost = (id) => async (dispatch) => {
    try {
        const res = await axios.put(`${url}/api/posts/unlike/${id}`);
        dispatch({
            type: UNLIKE_POST,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
        });
    }
};

// Comment on Post
export const commentOnPost =
    ({ id, text }) =>
    async (dispatch) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const body = JSON.stringify({ text });

        try {
            const res = await axios.put(
                `${url}/api/posts/comments/${id}`,
                body,
                config
            );
            dispatch({
                type: COMMENT_POST,
                payload: res.data,
            });
            dispatch(setAlert('Comment Added', 'success'));
        } catch (error) {
            dispatch({
                type: POST_ERROR,
            });
        }
    };

// Delete Comment
export const deleteComment =
    ({ id, commentId }) =>
    async (dispatch) => {
        try {
            const res = await axios.delete(
                `${url}/api/posts/comments/delete/${id}/${commentId}`
            );
            dispatch({
                type: DELETE_COMMENT,
                payload: res.data,
            });
            dispatch(setAlert('Comment Removed', 'success'));
        } catch (error) {
            dispatch({
                type: POST_ERROR,
            });
        }
    };
