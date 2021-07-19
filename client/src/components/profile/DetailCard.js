import React, { Fragment,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import editIcon from '../../images/icons/edit.png';
import { followUser, unfollowUser } from '../../redux/actions/profile';
import { createConversation } from '../../redux/actions/chat';
import Dashboard from './Dashboard';

const DetailCard = ({ profile, currUsername }) => {
    const dispatch = useDispatch();
    const [redirect,setRedirect] = useState(false);
    const {
        profile: {
            currProfile: { following },
        },
        post: { posts },
    } = useSelector((state) => state);
    const {
        user: { username, _id: userId },
        name,
        profileImg,
        bio,
        following: profile_following,
        followers: profile_followers,
    } = profile;

    const followStatus =
        following.filter((flw) => flw.user === userId).length > 0;

    const startConversation = () => {
        dispatch(createConversation(userId));
        setRedirect(true);
    };

    if(redirect) return <Redirect to="/inbox" />;

    return (
        <Fragment>
            <div className='profile-details'>
                {profile.user.username === currUsername && (
                    <div className='edit-icon'>
                        <Link className='btn' to={`/u/${currUsername}/update`}>
                            <img src={editIcon} alt='' />
                        </Link>
                    </div>
                )}
                <div className='profile-details-card'>
                    <div className='profile-img'>
                        <img src={profileImg} alt='profile-img' />
                    </div>
                    <div className='profile-content'>
                        <h3>{name}</h3>
                        <div className='profile-content-details'>
                            <p className='username'>{username}</p>
                            <Dashboard
                                followers={profile_followers}
                                following={profile_following}
                                posts={posts}
                            />
                            <p>{bio ? bio : '.'}</p>
                            {username !== currUsername && (
                                <div className='btn-grp'>
                                    {followStatus ? (
                                        <button
                                            className='btn btn-outline-primary'
                                            onClick={() => {
                                                dispatch(
                                                    unfollowUser({
                                                        id: userId,
                                                        username,
                                                    })
                                                );
                                            }}
                                        >
                                            UnFollow
                                        </button>
                                    ) : (
                                        <button
                                            className='btn btn-outline-primary'
                                            onClick={() => {
                                                dispatch(
                                                    followUser({
                                                        id: userId,
                                                        username,
                                                    })
                                                );
                                            }}
                                        >
                                            Follow
                                        </button>
                                    )}

                                    <button
                                        className='btn btn-primary'
                                        onClick={startConversation}
                                    >
                                        Message
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default DetailCard;
