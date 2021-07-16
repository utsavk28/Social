import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import deleteCommentIcon from '../../images/icons/deleteComment.png';
import { deleteComment } from '../../redux/actions/post';

const Comment = ({ comment, post }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    return (
        <div className='comment'>
            <div className='comment-headline'>
                <div className='profile-img-comment'>
                    <Link
                        to={`/u/${comment.username}`}
                        className='remove-link-style'
                    >
                        <img src={comment.profileImage} alt='profile-img' />
                    </Link>
                </div>
                <Link
                    to={`/u/${comment.username}`}
                    className='remove-link-style'
                >
                    <h5>{comment.username}</h5>
                </Link>
            </div>
            <div className='comment-content'>
                <p>{comment.text}</p>
            </div>
            {comment.user === user._id && (
                <button
                    className='btn delete-btn'
                    onClick={() => {
                        dispatch(
                            deleteComment({
                                id: post._id,
                                commentId: comment._id,
                            })
                        );
                    }}
                >
                    <img src={deleteCommentIcon} alt='' />
                </button>
            )}
        </div>
    );
};

export default Comment;
