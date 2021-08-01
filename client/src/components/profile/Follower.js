import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DetailCard from './DetailCard';
import { getProfile } from '../../redux/actions/profile';
import Loader from '../layout/Loader';
import './profile.css';
import FollowList from './FollowList';
import {  Redirect } from 'react-router-dom';

const Follower = ({ match }) => {
    const username = match.params.username;
    const dispatch = useDispatch();
    const { currProfile, profile, loading,error } = useSelector(
        (state) => state.profile
    );

    useEffect(() => {
        dispatch(getProfile(username));
    }, [dispatch, username]);
    if (error) return <Redirect to='/404' />;

    return (
        <div className='container-md mt-4 bg-white'>
            {loading || !profile || !currProfile ? (
                <Loader />
            ) : (
                <Fragment>
                    <DetailCard
                        profile={profile}
                        currUsername={currProfile.user.username}
                    />
                    <FollowList list={profile.followers} type={'Followers'} />
                </Fragment>
            )}
        </div>
    );
};

export default Follower;
