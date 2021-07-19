import axios from 'axios';
import url from '../../utils/api';
import socket from '../../utils/socket';

import {
    GET_CONVERSATION,
    GET_USER_CONVERSATIONS,
    CREATE_CONVERSATION,
    CONVERSATION_ERROR,
    SEND_MESSAGE,
    MESSAGE_ERROR,
    GET_MESSAGES,
    ADD_MESSAGE,
} from '../type';

// Get User Conversations
export const getUserConversations = () => async (dispatch) => {
    try {
        let res = await axios.get(`${url}/api/conversation`);
        for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < res.data[i].members.length; j++) {
                const profile = await axios.get(
                    `${url}/api/profile/user/id/${res.data[i].members[j]._id}`
                );
                res.data[i].members[j].profile = profile.data;
            }
        }
        dispatch({
            type: GET_USER_CONVERSATIONS,
            payload: res.data,
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: CONVERSATION_ERROR,
        });
    }
};

// Get a Single Conversations
export const getConversation = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`${url}/api/conversation/${id}`);
        const conversation = res.data;
        for (let j = 0; j < conversation.members.length; j++) {
            const profile = await axios.get(
                `${url}/api/profile/user/id/${conversation.members[j]._id}`
            );
            conversation.members[j].profile = profile.data;
        }
        dispatch({
            type: GET_CONVERSATION,
            payload: conversation,
        });
        const messages = await axios.get(
            `${url}/api/message/${conversation._id}/`
        );
        dispatch({
            type: GET_MESSAGES,
            payload: messages.data,
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: CONVERSATION_ERROR,
        });
    }
};

// Create Conversations
export const createConversation = (id) => async (dispatch) => {
    try {
        const res = await axios.post(`${url}/api/conversation/${id}`);
        dispatch({
            type: CREATE_CONVERSATION,
            payload: res.data,
        });
    } catch (error) {
        console.log(error);
        dispatch({
            type: CONVERSATION_ERROR,
        });
    }
};

// Send Message
export const sendMessage =
    ({ id, text, receiverId }) =>
    async (dispatch) => {
        try {
            const body = {
                text,
            };
            const res = await axios.post(`${url}/api/message/${id}`, body);
            dispatch({
                type: SEND_MESSAGE,
                payload: res.data,
            });

            socket.emit('message', {
                text: text,
                userId: receiverId,
                senderId: res.data.sender,
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: MESSAGE_ERROR,
            });
        }
    };

// Custom Message Adder
export const addMessage =
    ({ text, sender, _id, conversationId, date }) =>
    async (dispatch) => {
        dispatch({
            type: ADD_MESSAGE,
            payload: { text, sender, _id, conversationId, date },
        });
    };
