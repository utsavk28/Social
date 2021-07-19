import React from 'react';
import ChatList from './ChatList';
import './chat.css';

const Messenger = ({ match }) => {
    return (
        <div className='container-fluid d-flex mt-4'>
            <ChatList />
        </div>
    );
};

export default Messenger;
