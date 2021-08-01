import {
    COMMENT_POST,
    DELETE_COMMENT,
    DELETE_POST,
    GET_POST,
    GET_POSTS,
    GET_USERS_POSTS,
    LIKE_POST,
    POST_POST,
    UNLIKE_POST,
    UPDATE_POST,
    POST_ERROR,
} from '../type';

const initialState = {
    loading: true,
    post: {},
    posts: [],
    error: null,
};

var updatedPosts;

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_POST:
            return {
                ...state,
                post: payload,
                loading: false,
                error: null,
            };
        case GET_USERS_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false,
                error: null,
            };
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false,
                error: null,
            };
        case POST_POST:
            return {
                ...state,
                post: payload,
                posts: [payload, ...state.posts],
                loading: false,
                error: null,
            };
        case LIKE_POST:
        case UNLIKE_POST:
        case COMMENT_POST:
        case UPDATE_POST:
        case DELETE_COMMENT:
            updatedPosts = state.posts.map((post) =>
                post._id === payload._id ? payload : post
            );
            return {
                ...state,
                post: payload,
                posts: updatedPosts,
                loading: false,
                error: null,
            };
        case DELETE_POST:
            updatedPosts = state.posts.filter((post) => post._id !== payload);
            return {
                ...state,
                post: {},
                posts: updatedPosts,
                loading: false,
                error: null,
            };
        case POST_ERROR:
            return {
                ...state,
                loading: false,
                error: 'Error',
            };
        default:
            return state;
    }
};

export default reducer;
