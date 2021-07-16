import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DetailCard from './DetailCard';
import { getProfile } from '../../redux/actions/profile';
import Loader from '../layout/Loader';
import FollowList from './FollowList';
import './profile.css';

const Following = ({ match }) => {
    const username = match.params.username;
    const dispatch = useDispatch();
    const {
        currProfile,
        profile,
        loading,
    } = useSelector((state) => state.profile);


    useEffect(() => {
        dispatch(getProfile(username));
    }, [dispatch, username]);

    return (
        <div className='container-md mt-4'>
            {loading || !profile || !currProfile ? (
                <Loader />
            ) : (
                <Fragment>
                    <DetailCard
                        profile={profile}
                        currUsername={currProfile.user.username}
                    />
                    <FollowList list={profile.following} type={'Following'} />
                </Fragment>
            )}
        </div>
    );
};

export default Following;
