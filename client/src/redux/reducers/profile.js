import {
    GET_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    GET_CURR_PROFILE,
    UPDATE_PROFILE,
    GET_PROFILES,
} from '../type';

const initialState = {
    currProfile: null,
    profile: null,
    profiles: [],
    loading: true,
    error: null,
};

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                currProfile: payload,
                loading: false,
                error: null,
            };
        case GET_CURR_PROFILE:
            return {
                ...state,
                currProfile: payload,
                loading: false,
                error: null,
            };
        case GET_PROFILES: {
            return {
                ...state,
                profiles: payload,
                loading: false,
                error: null,
            };
        }
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
                error: null,
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: 'Error',
                loading: false,
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                profiles: [],
                error: null,
                loading: false,
            };
        default:
            return state;
    }
};

export default reducer;
