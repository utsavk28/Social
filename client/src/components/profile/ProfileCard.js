import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { followUser, unfollowUser } from '../../redux/actions/profile';

const ProfileCard = ({ profile, currUsername, currProfile }) => {
    const dispatch = useDispatch();
    const {
        user: { username, _id: userId },
        name,
        profileImg,
    } = profile;

    const followStatus =
        currProfile.following.filter((flw) => flw.user === userId).length > 0;

    return (
        <div className='profile-item-details-card'>
            <div className='profile-img-post'>
                <img src={profileImg} alt='profile-img' />
            </div>
            <div className='profile-content'>
                <h5>{name}</h5>
                <div className='profile-content-details'>
                    <p className='username'>{username}</p>
                </div>
            </div>
            {username !== currUsername && (
                <div className='btn-grp-card'>
                    {followStatus ? (
                        <button
                            className='btn btn-outline-primary'
                            onClick={() => {
                                dispatch(
                                    unfollowUser({
                                        id: userId,
                                        username:currUsername,
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
                                        username:currUsername,
                                    })
                                );
                            }}
                        >
                            Follow
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileCard;
