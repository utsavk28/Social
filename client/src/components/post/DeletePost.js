import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { deletePost } from '../../redux/actions/post';

const DeletePost = ({ match }) => {
    const [action, setAction] = useState(false);
    const dispatch = useDispatch();

    if (action) return <Redirect to='/' />;

    return (
        <div className='container-md post mx-auto'>
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
