import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import backIcon from '../../images/icons/back.png';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/actions/profile';
import getBase64 from '../../utils/getBase64';

const ProfileForm = ({ currUsername }) => {
    const {profile} = useSelector(state => state.profile)
    const [redirect, setRedirect] = useState(false);
    const {
        user: { username },
        name,
        profileImg,
        bio,
        DOB,
    } = profile;

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        username: username,
        fullname: name,
        bio: bio ? bio : '',
        profileImg: profileImg,
        DOB: DOB,
    });

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(updateProfile(formData));
        setRedirect(true);
    };

    if (currUsername !== username || redirect)
        return <Redirect to={`/u/${currUsername}`} />;

    return (
        <Fragment>
            <div className='profile-details'>
                <div className='edit-icon'>
                    <Link to={`/u/${currUsername}`} className='btn'>
                        <img src={backIcon} alt='' />
                    </Link>
                </div>
                <div>
                    <form className='m-4' onSubmit={submitForm}>
                        <h2 className='mb-4'>Update Profile</h2>

                        <div className='mb-3'>
                            <label htmlFor='username' className='form-label'>
                                Username
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                id='username'
                                name='username'
                                value={formData.username}
                                disabled
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='fullname' className='form-label'>
                                Full Name
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                id='fullname'
                                name='fullname'
                                value={formData.fullname}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='bio' className='form-label'>
                                Bio
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                id='bio'
                                name='bio'
                                value={formData.bio}
                                onChange={onChange}
                            />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='profileImg' className='form-label'>
                                Profile Image :
                            </label>
                            <input
                                type='file'
                                className='form-control'
                                id='profileImg'
                                name='profileImg'
                                onChange={async (e) => {
                                    const filePath = await getBase64(
                                        e.target.files[0]
                                    );
                                    setFormData({
                                        ...formData,
                                        profileImg: filePath,
                                    });
                                }}
                            />
                        </div>

                        <button
                            type='submit'
                            className='btn btn-primary'
                        >
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default ProfileForm;
