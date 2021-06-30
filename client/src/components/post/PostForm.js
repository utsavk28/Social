import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './post.css';
import getBase64 from '../../utils/getBase64';
import PreviewPost from './PreviewPost';
import { postPost } from '../../redux/actions/post';

const PostForm = () => {
    const dispatch = useDispatch();
    const {
        profile: { currProfile },
    } = useSelector((state) => state);

    const [formData, setFormData] = useState({
        text: '',
        img: '',
    });

    const onChange = async (e) => {
        if (e.target.name === 'img') {
            if (e.target.files.length !== 0) {
                const filePath = await getBase64(e.target.files[0]);
                setFormData({
                    ...formData,
                    img: filePath,
                });
            } else {
                setFormData({
                    ...formData,
                    img: '',
                });
            }
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(postPost(formData));
        setFormData({
            text: '',
            img: '',
        });
    };

    return (
        <div className='post-form'>
            {(!currProfile) ? '' : (
                <Fragment>
                    <div className='post-form-container'>
                        <div className='profile-img-post'>
                            <img
                                src={currProfile.profileImg}
                                alt='profile-img'
                            />
                        </div>
                        <form className='post-form-form' onSubmit={onSubmit}>
                            <input
                                className='w-75 post-text'
                                type='text'
                                placeholder="What's Happening ?"
                                name='text'
                                maxLength='255'
                                value={formData.text}
                                onChange={onChange}
                            />
                            <input
                                className='post-file'
                                type='file'
                                name='img'
                                onChange={onChange}
                            />
                        </form>
                    </div>
                    {(formData.text !== '' || formData.img !== '') && (
                        <div className='preview-post'>
                            <PreviewPost post={formData} />
                            <button
                                onClick={onSubmit}
                                className='btn btn-primary'
                            >
                                Post
                            </button>
                        </div>
                    )}
                </Fragment>
            )}
        </div>
    );
};

export default PostForm;
