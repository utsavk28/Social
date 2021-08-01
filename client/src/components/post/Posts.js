import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post';
import Loader from '../layout/Loader';

const Posts = () => {
    const {
        post: { posts, loading },
        profile: { currProfile },
    } = useSelector((state) => state);

    return loading ? (
        <Loader />
    ) : (
        <div className='bg-white' >
            {posts.map((pst) => {
                return (
                    <Post post={pst} key={pst._id} currProfile={currProfile} disableInteraction={false} />
                );
            })}
        </div>
    );
};

export default Posts;
