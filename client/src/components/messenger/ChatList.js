import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserConversations } from '../../redux/actions/chat';
import Loader from '../layout/Loader';

const ChatList = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {
        chat: { conversations, conversation },
        auth: {
            user: { username: og_username },
        },
    } = useSelector((state) => state);

    useEffect(() => {
        dispatch(getUserConversations());
    }, [dispatch, conversation]);

    return (
        <div className='cover-chat-container cover-chat-container-1'>
            <div className='cover-chat-container-header m-2'>
                <h5>Chats</h5>
            </div>
            <ul className='list-unstyled'>
                {conversations.length > 0 ? (
                    conversations.map((conv) => {
                        const user = conv.members.filter(
                            (c) => c.username !== og_username
                        )[0];
                        return (
                            <li key={conv._id}>
                                <div
                                    className='btn'
                                    onClick={() => {
                                        history.push(`/inbox/${user._id}`);
                                    }}
                                >
                                    <div className='chat-item-card'>
                                        <div className='chat-img-post'>
                                            <img
                                                src={user.profile.profileImg}
                                                alt='profile-img'
                                            />
                                        </div>
                                        <div className='chat-item-content'>
                                            <h5>{user.username}</h5>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <Loader />
                )}
            </ul>
        </div>
    );
};

export default ChatList;
