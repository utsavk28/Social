import React from 'react';
import { useSelector } from 'react-redux';

const PreviewPost = ({ post }) => {
    const { currProfile } = useSelector((state) => state.profile);
    return (
        <div className="post" >
            <div className="post-headline" >
                <div className='profile-img-post'>
                    <img src={currProfile.profileImg} alt='profile-img' />
                </div>
                <div className='profile-user-details'>
                    <h4>{currProfile.name}</h4>
                    <p>@{currProfile.user.username}</p>
                </div>
            </div>
            <div className="post-content" >
                <div className="post-content-text" >
                    <p>{post.text}</p>
                </div>
                <div className="post-content-img" >
                    <img src={post.img} alt="" />
                </div>
            </div>
        </div>
    );
};

export default PreviewPost;
