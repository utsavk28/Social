import React, { Fragment } from 'react';
import {Link} from 'react-router-dom'
import editIcon from '../../images/icons/edit.png';

const DetailCard = ({ profile, currUsername }) => {
    const {
        user: { username },
        name,
        profileImg,
        bio,
    } = profile;

    return (
        <Fragment>
            <div className='profile-details'>
                {profile.user.username === currUsername && (
                    <div className='edit-icon'>
                        <Link className='btn' to={`/u/${currUsername}/update`} >
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
                            <p>{bio ? bio : '.'}</p>
                            {username !== currUsername && (
                                <div className='btn-grp'>
                                    <button className='btn btn-primary'>
                                        Message
                                    </button>
                                    <button className='btn btn-outline-primary'>
                                        Follow
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
