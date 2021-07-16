import { SAVED_POST_ERROR, GET_SAVED_POST, UPDATE_SAVED_POST } from '../type';

const initialState = {
    savedPost: {},
    error: '',
};

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_SAVED_POST:
        case UPDATE_SAVED_POST:
            return {
                ...state,
                savedPost: payload,
                error: '',
            };
        case SAVED_POST_ERROR:
            return {
                ...state,
                savedPost: {},
                error: 'Error',
            };
        default:
            return state;
    }
};

export default reducer;
