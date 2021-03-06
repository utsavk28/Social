import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DetailCard from './DetailCard';
import ProfileForm from './ProfileForm';
import PostContainer from './PostsContainer';
import { getProfile } from '../../redux/actions/profile';
import Loader from '../layout/Loader';
import './profile.css';
import { getUsersPost } from '../../redux/actions/post';
import {  Redirect } from 'react-router-dom';

const Profile = ({ match }) => {
    const username = match.params.username;
    const dispatch = useDispatch();
    const { currProfile, profile, loading ,error} = useSelector(
        (state) => state.profile
    );

    useEffect(() => {
        dispatch(getProfile(username));
    }, [dispatch, username]);

    useEffect(() => {
        if (profile) dispatch(getUsersPost(profile.user._id));
    }, [dispatch, profile, username]);

    if (error) return <Redirect to='/404' />;


    return (
        <div className='container-md mt-4 bg-white'>
            {loading || !profile || !currProfile ? (
                <Loader />
            ) : match.path.split('/')[3] === 'update' ? (
                <ProfileForm
                    profile={profile}
                    currUsername={currProfile.user.username}
                />
            ) : (
                <Fragment>
                    <DetailCard
                        profile={profile}
                        currUsername={currProfile.user.username}
                    />
                    <PostContainer />
                </Fragment>
            )}
        </div>
    );
};

export default Profile;
