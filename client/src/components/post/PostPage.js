import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById } from '../../redux/actions/post';
import Post from './Post';
import {  Redirect } from 'react-router-dom';

const PostPage = ({ match }) => {
    const dispatch = useDispatch();
    const {
        post: { post, error },
    } = useSelector((state) => state);

    useEffect(() => {
        dispatch(getPostById(match.params.post));
    }, [dispatch, match.params.post]);


    if (error) return <Redirect to='/404' />;

    return (
        <div classNameName='container-lg my-4 mx-auto bg-white'>
            {Object.keys(post).length && <Post post={post} onPostPage={true} />}
        </div>
    );
};

export default PostPage;
