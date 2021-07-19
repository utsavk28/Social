import React from 'react';

const Message = ({ text, className }) => {
    return (
        <div className='message-cover'>
            {className && <div />}
            <div className={`${className} message`}>{text}</div>
        </div>
    );
};

export default Message;
