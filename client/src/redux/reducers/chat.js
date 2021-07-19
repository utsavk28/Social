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
    error: {},
};

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case GET_CONVERSATION:
            return {
                ...state,
                conversation: payload,
            };
        case GET_MESSAGES:
            return {
                ...state,
                messages: payload,
            };
        case GET_USER_CONVERSATIONS:
            return {
                ...state,
                conversations: payload,
            };
        case CREATE_CONVERSATION:
            return {
                ...state,
                conversation: payload,
            };
        case MESSAGE_ERROR:
            return {
                ...state,
                error: 'Message Error',
            };
        case CONVERSATION_ERROR:
            return {
                ...state,
                error: 'Conversation Error',
            };
        case SEND_MESSAGE:
            return {
                ...state,
                message: payload,
            };
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, payload],
            };
        default:
            return state;
    }
};

export default reducer;
