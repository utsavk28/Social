import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfilesById } from '../../redux/actions/profile';
import ProfileCard from './ProfileCard';

const FollowList = ({ list, type }) => {
    const {
        profile: { profiles, currProfile },
        auth: {
            user: { username },
        },
    } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProfilesById(list));
    }, [dispatch, list]);

    return (
        <div className='profile-details mt-4'>
            <h4 className='text-center'>{type}</h4>
            <hr />
            <div>
                {profiles.map((profile) => {
                    return (
                        <ProfileCard
                            key={profile._id}
                            profile={profile}
                            currUsername={username}
                            currProfile={currProfile}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default FollowList;
