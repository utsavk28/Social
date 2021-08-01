import React from 'react';
import { useSelector } from 'react-redux';
import Post from '../post/Post';
import Loader from '../layout/Loader';

const ExplorePosts = () => {
    const {
        post: { posts, loading },
        profile: { currProfile },
    } = useSelector((state) => state);

    return loading ? (
        <Loader />
    ) : (
        <div className='explore-page'>
            {posts.map((pst, index) => {
                return (
                    <Post
                        index={index}
                        post={pst}
                        key={pst._id}
                        currProfile={currProfile}
                        disableInteraction={true}
                    />
                );
            })}
        </div>
    );
};

export default ExplorePosts;
