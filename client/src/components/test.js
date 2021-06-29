import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions/auth';
import PostForm from './post/PostForm';

const Test = () => {
    const dispatch = useDispatch();

    return (
        <div className='container-md'>
            <PostForm />
            <p>Test</p>
            <button
                onClick={() => {
                    dispatch(logout());
                }}
            >
                log out
            </button>
        </div>
    );
};

export default Test;
