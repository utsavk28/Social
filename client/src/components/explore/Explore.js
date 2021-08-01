import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPost } from '../../redux/actions/post';
import ExplorePosts from './ExplorePosts';
import './explore.css';

const Explore = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPost());
    }, [dispatch]);

    return (
        <div className='explore-container my-4'>
            <ExplorePosts />
        </div>
    );
};

export default Explore;
