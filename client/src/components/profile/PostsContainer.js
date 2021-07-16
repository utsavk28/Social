import React, { useState } from 'react';
import Posts from '../post/Posts';
import SavedPost from '../post/SavedPost';

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
                            'saved' === tab ? 'active' : ''
                        }`}
                        name='saved'
                        onClick={onClick}
                    >
                        Saved Posts
                    </button>
                </li>
            </ul>
            {tab === 'post' ? <Posts /> : <SavedPost />}
        </div>
    );
};

export default PostsContainer;
