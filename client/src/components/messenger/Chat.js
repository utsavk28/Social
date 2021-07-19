import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConversation, sendMessage } from '../../redux/actions/chat';
import socket from '../../utils/socket';
import { getProfileById } from '../../redux/actions/profile';
import Message from './Message';
import Loader from '../layout/Loader';

const Chat = ({ match }) => {
    var id = match.params.id;
    socket.on('message', (data) => {
        dispatch(getConversation(id));
    });
    const dispatch = useDispatch();
    const {
        auth: {
            user: { _id, username: og_username },
        },
        chat: { conversation, messages },
    } = useSelector((state) => state);

    const [text, setText] = useState('');
    const [user, setUser] = useState(
        conversation &&
            conversation.members.filter((c) => c.username !== og_username)[0]
    );

    useEffect(() => {
        if (id) dispatch(getProfileById(id));
        if (id) dispatch(getConversation(id));
    }, [id]);

    useEffect(() => {
        setUser(
            conversation &&
                conversation.members.filter(
                    (c) => c.username !== og_username
                )[0]
        );
    }, [conversation, og_username]);

    const onChange = (e) => {
        setText(e.target.value);
    };

    const enterChat = (e) => {
        e.preventDefault();
        dispatch(
            sendMessage({
                id: conversation._id,
                text: text,
                receiverId: user._id,
            })
        );
        dispatch(getConversation(id));
        setText('');
    };

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className='cover-chat-container cover-chat-container-2'>
            {conversation && user ? (
                <div className='chat-container'>
                    <div className='profile-item-details-card mx-4 my-1 border-bottom'>
                        <div className='profile-img-post'>
                            <img
                                src={user.profile.profileImg}
                                alt='profile-img'
                            />
                        </div>
                        <div className='profile-content'>
                            <h5>{user.profile.name}</h5>
                            <div className='profile-content-details'>
                                <p className='username'>{user.username}</p>
                            </div>
                        </div>
                    </div>
                    <div id='messages' className='mt-2 mx-1'>
                        {messages.map((msg) => {
                            return (
                                <Message
                                    key={msg._id}
                                    className={msg.sender === _id && 'sender'}
                                    text={msg.text}
                                />
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>

                    <form id='form' onSubmit={enterChat}>
                        <input
                            id='input'
                            autoComplete='off'
                            onChange={onChange}
                            value={text}
                        />
                        <button type='submit' disabled={text === ''}>
                            Send
                        </button>
                    </form>
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default Chat;
