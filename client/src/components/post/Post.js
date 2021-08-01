import React, { useEffect, useState, Fragment } from 'react';
import heart from '../../images/icons/heart.png';
import heartFilled from '../../images/icons/heart-filled.png';
import { Link } from 'react-router-dom';
import comments from '../../images/icons/comments.png';
import options from '../../images/icons/options.png';
import bookmark from '../../images/icons/bookmark.png';
import bookmark1 from '../../images/icons/bookmark1.png';
import Comments from './Comments';
import { useDispatch, useSelector } from 'react-redux';
import { commentOnPost, likePost, unlikePost } from '../../redux/actions/post';
import { addSavedPost, removeSavedPost } from '../../redux/actions/savedposts';
import { DateFormatter } from '../../utils/date-formatter';

const Post = ({ post, onPostPage, disableInteraction, index }) => {
    const [comment, setComment] = useState('');
    const [active, setActive] = useState(false);
    const {
        auth: { user },
        savedpost: {
            savedPost: { savedPosts },
        },
    } = useSelector((state) => state);
    const [isLiked, setIsLiked] = useState();
    const [saved, setSaved] = useState(false);
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

    useEffect(() => {
        if (savedPosts)
            setSaved(
                savedPosts.filter((post1) => post1._id === post._id).length > 0
            );
    }, [post, savedPosts]);

    const onClick = () => {
        if (isLiked) {
            dispatch(unlikePost(post._id));
        } else {
            dispatch(likePost(post._id));
        }
    };

    const savePostBtn = (e) => {
        if (e.target.name === 'remove') dispatch(removeSavedPost(post._id));
        else if (e.target.name === 'save') dispatch(addSavedPost(post._id));
    };

    const submitComment = (e) => {
        e.preventDefault();
        dispatch(commentOnPost({ id: post._id, text: comment }));
        setComment('');
    };

    return (
        <div
            className={`post bg-white ${
                index % 3 === 2 && 'explore-main-post'
            }`}
        >
            {post && (
                <>
                    <div className='post-headline'>
                        <div className='profile-img-post'>
                            <Link
                                to={`/u/${post.username}`}
                                className='remove-link-style'
                            >
                                <img
                                    src={post.profileImage}
                                    alt='profile-img'
                                />
                            </Link>
                        </div>
                        <div className='profile-user-details'>
                            <Link
                                to={`/u/${post.username}`}
                                className='remove-link-style'
                            >
                                <h4>{post.name}</h4>
                                <p>@{post.username}</p>
                            </Link>
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
                    <div className='post-content'>
                        <Link
                            className='remove-link-style'
                            to={`/p/${post._id}`}
                        >
                            <div className='post-content-text'>
                                <p>{post.text}</p>
                            </div>
                            {post.img && (
                                <div className='post-content-img'>
                                    <img src={post.img} alt='' />
                                </div>
                            )}
                        </Link>
                        <p className='post-date'>{DateFormatter(post.date)}</p>
                    </div>

                    <div className='post-interaction'>
                        <div className='post-interaction-btns'>
                            <div>
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
                                    {post.comments.length}
                                </button>
                            </div>
                            {saved ? (
                                <button
                                    className='btn bookmark-btn'
                                    name='remove'
                                    // onClick={savePostBtn}
                                >
                                    <img
                                        name='remove'
                                        className=''
                                        src={bookmark1}
                                        alt=''
                                        onClick={savePostBtn}
                                    />
                                </button>
                            ) : (
                                <button
                                    className='btn bookmark-btn'
                                    name='save'
                                    // onClick={savePostBtn}
                                >
                                    <img
                                        name='save'
                                        className=''
                                        src={bookmark}
                                        alt=''
                                        onClick={savePostBtn}
                                    />
                                </button>
                            )}
                        </div>
                        {!disableInteraction && (
                            <Fragment>
                                <div className='post-interaction-comments'>
                                    <form
                                        className='comment-form'
                                        onSubmit={submitComment}
                                    >
                                        <input
                                            type='text'
                                            className='comment-input'
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
                                    <Comments
                                        onPostPage={onPostPage}
                                        post={post}
                                    />
                                )}
                            </Fragment>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Post;
