import React from 'react';
import {ChatDateFormatter} from '../../utils/date-formatter';

const Message = ({ msg, className }) => {
    const { text,date } = msg;
    console.log(ChatDateFormatter(date));
    return (
        <div className='message-cover'>
            {className && <div />}
            <div className={`${className} message`}>
                <p className={`message-text ${className}-message-text`}>{text}</p>
                <p className={`chat-date ${className}-chat-date`}>{ChatDateFormatter(date)}</p>
            </div>
        </div>
    );
};

export default Message;
