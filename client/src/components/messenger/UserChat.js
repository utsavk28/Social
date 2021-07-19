import React from 'react';
import Chat from './Chat';
import './chat.css';

const UserChat = ({ match, location }) => {
    return (
        <div className='container-fluid d-flex mt-4'>
            <Chat match={match} />
        </div>
    );
};

export default UserChat;
