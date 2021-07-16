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
    error: {},
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
            };
        case GET_CURR_PROFILE:
            return {
                ...state,
                currProfile: payload,
                loading: false,
            };
        case GET_PROFILES: {
            return {
                ...state,
                profiles: payload,
                loading: false,
            };
        }
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false,
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                profiles: [],
                loading: false,
            };
        default:
            return state;
    }
};

export default reducer;
