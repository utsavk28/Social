import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPost } from '../../redux/actions/post';
import PostForm from '../post/PostForm';
import Posts from '../post/Posts';
import './home.css';

const HomePage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPost());
    }, [dispatch]);
    return (
        <div className='home-container'>
            <PostForm />
            <Posts />
        </div>
    );
};

export default HomePage;
