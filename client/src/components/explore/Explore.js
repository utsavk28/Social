import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllPost } from '../../redux/actions/post';
import Posts from '../post/Posts';
import './explore.css';

const Explore = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllPost());
    }, [dispatch]);
    return (
        <div className='explore-container'>
            <h2 className='text-center my-4'>Explore Page</h2>
            <Posts />
        </div>
    );
};

export default Explore;
