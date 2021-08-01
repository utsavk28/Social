import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { deletePost } from '../../redux/actions/post';
import { getPostById } from '../../redux/actions/post';

const DeletePost = ({ match }) => {
    const { error } = useSelector(
        (state) => state.post
    );
    const [action, setAction] = useState(false);
    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(getPostById(match.params.post));
    }, [dispatch, match.params.post]);

    if (action) return <Redirect to='/' />;
    if (error) return <Redirect to='/404' />;

    return (
        <div className='container-md post mx-auto bg-white'>
            <div className='mx-auto text-center'>
                <p>Are You Sure ?</p>
                <button
                    className='btn btn-outline-danger'
                    onClick={() => {
                        dispatch(deletePost(match.params.post));
                        setAction(true);
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DeletePost;
