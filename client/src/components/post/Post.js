import React, { useEffect, useState } from 'react';
import heart from '../../images/icons/heart.png';
import heartFilled from '../../images/icons/heart-filled.png';
import { Link } from 'react-router-dom';
import comments from '../../images/icons/comments.png';
import options from '../../images/icons/options.png';
import Comments from './Comments';
import { useDispatch, useSelector } from 'react-redux';
import { commentOnPost, likePost, unlikePost } from '../../redux/actions/post';

const Post = ({ post, onPostPage }) => {
    const [comment, setComment] = useState('');
    const [active, setActive] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const [isLiked, setIsLiked] = useState();

    const dispatch = useDispatch();

    const onChange = (e) => {
        setComment(e.target.value);
    };

    useEffect(() => {
        if (post.likes && user)
            setIsLiked(
                post.likes.filter((like) => like.user === user._id).length !== 0
            );
    }, [post, user]);

    const onClick = () => {
        if (isLiked) {
            dispatch(unlikePost(post._id));
        } else {
            dispatch(likePost(post._id));
        }
    };

    const submitComment = (e) => {
        e.preventDefault();
        dispatch(commentOnPost({ id: post._id, text: comment }));
        setComment('');
    };

    return (
        <div className='post'>
            {post && (
                <>
                    <div className='post-headline'>
                        <div className='profile-img-post'>
                            <img src={post.profileImage} alt='profile-img' />
                        </div>
                        <div className='profile-user-details'>
                            <h4>{post.name}</h4>
                            <p>@{post.username}</p>
                        </div>
                        <div className='option-icon'>
                            <button
                                className='btn'
                                onClick={() => {
                                    setActive(!active);
                                }}
                            >
                                <img src={options} alt='options' />
                            </button>
                        </div>
                        {active && (
                            <div className='option-div'>
                                <div>
                                    <Link to={`/p/${post._id}`}>
                                        Go to post
                                    </Link>
                                </div>
                                {user._id === post.user && (
                                    <>
                                        <div>
                                            <Link to={`/p/${post._id}/edit`}>
                                                Edit Post
                                            </Link>
                                        </div>
                                        <div>
                                            <Link to={`/p/${post._id}/delete`}>
                                                Delete Post
                                            </Link>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                    <Link className='remove-link-style' to={`/p/${post._id}`}>
                        <div className='post-content'>
                            <div className='post-content-text'>
                                <p>{post.text}</p>
                            </div>
                            {post.img && (
                                <div className='post-content-img'>
                                    <img src={post.img} alt='' />
                                </div>
                            )}
                        </div>
                    </Link>
                    <div className='post-interaction'>
                        <div className='post-interaction-btns'>
                            <button className='btn' onClick={onClick}>
                                {isLiked ? (
                                    <img
                                        className='like-btn'
                                        src={heartFilled}
                                        alt=''
                                    />
                                ) : (
                                    <img
                                        className='like-btn'
                                        src={heart}
                                        alt=''
                                    />
                                )}
                                {post.likes.length}
                            </button>
                            <button className='btn'>
                                <img
                                    className='comment-btn'
                                    src={comments}
                                    alt=''
                                />{' '}
                                { post.comments.length}
                            </button>
                        </div>
                        <div className='post-interaction-comments'>
                            <form
                                className='comment-form'
                                onSubmit={submitComment}
                            >
                                <input
                                    type='text'
                                    placeholder='   Add a comment...'
                                    onChange={onChange}
                                    name='comment'
                                    value={comment}
                                />
                                <button
                                    className='btn btn-primary'
                                    type='submit'
                                >
                                    Post
                                </button>
                            </form>
                        </div>
                        {post.comments && (
                            <Comments onPostPage={onPostPage} post={post} />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Post;
