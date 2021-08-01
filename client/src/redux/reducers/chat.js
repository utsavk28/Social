import {
    GET_CONVERSATION,
    GET_USER_CONVERSATIONS,
    CREATE_CONVERSATION,
    CONVERSATION_ERROR,
    GET_MESSAGES,
    MESSAGE_ERROR,
    SEND_MESSAGE,
    ADD_MESSAGE,
} from '../type';

const initialState = {
    loading: true,
    conversations: [],
    conversation: null,
    message: null,
    messages: [],
    error: null,
};

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_CONVERSATION:
            return {
                ...state,
                conversation: payload,
                error: null,

            };
        case GET_MESSAGES:
            return {
                ...state,
                messages: payload,
                error: null,

            };
        case GET_USER_CONVERSATIONS:
            return {
                ...state,
                conversations: payload,
                error: null,

            };
        case CREATE_CONVERSATION:
            return {
                ...state,
                conversation: payload,
                error: null,

            };
        case MESSAGE_ERROR:
            return {
                ...state,
                error: 'Message Error',
                loading: false,
            };
        case CONVERSATION_ERROR:
            return {
                ...state,
                loading: false,
                error: 'Conversation Error',
            };
        case SEND_MESSAGE:
            return {
                ...state,
                message: payload,
                error: null,

            };
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, payload],
                error: null,

            };
        default:
            return state;
    }
};

export default reducer;
