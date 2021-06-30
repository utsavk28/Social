import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById } from '../../redux/actions/post';
import Post from './Post';

const PostPage = ({ match }) => {
    const dispatch = useDispatch();
    const {
        post: { post },
    } = useSelector((state) => state);

    useEffect(() => {
        dispatch(getPostById(match.params.post));
    }, [dispatch, match.params.post]);


    return (
        <div className='container-lg my-4 mx-auto'>
            {Object.keys(post).length && <Post post={post} onPostPage={true} />}
        </div>
    );
};

export default PostPage;
