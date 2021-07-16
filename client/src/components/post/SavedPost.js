import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Post from './Post';
import Loader from '../layout/Loader';
import { getPostsById } from '../../redux/actions/post';

const SavedPost = () => {
    const dispatch = useDispatch();
    const {
        savedpost: {
            savedPost: { savedPosts },
        },
        post: { posts, loading },
        profile: { currProfile },
    } = useSelector((state) => state);

    useEffect(() => {
        dispatch(getPostsById(savedPosts));
    }, [dispatch, savedPosts]);

    return loading ? (
        <Loader />
    ) : (
        <div>
            {posts.map((pst) => {
                return (
                    <Post post={pst} key={pst._id} currProfile={currProfile} />
                );
            })}
        </div>
    );
};

export default SavedPost;
