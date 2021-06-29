import React, { useState } from 'react';
import Posts from '../post/Posts';

const PostsContainer = () => {
    const [tab, setTab] = useState('post');

    const onClick = (e) => {
        setTab(e.target.name);
    };

    return (
        <div className='post-container mt-4'>
            <ul className='nav nav-tabs'>
                <li className='nav-item'>
                    <button
                        className={`nav-link ${'post' === tab ? 'active' : ''}`}
                        name='post'
                        onClick={onClick}
                    >
                        Posts
                    </button>
                </li>
                <li className='nav-item'>
                    <button
                        className={`nav-link ${
                            'comment' === tab ? 'active' : ''
                        }`}
                        name='comment'
                        onClick={onClick}
                    >
                        Comments
                    </button>
                </li>
            </ul>
            <Posts />
        </div>
    );
};

export default PostsContainer;
