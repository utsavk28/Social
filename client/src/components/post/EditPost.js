import React, { useEffect, useState } from 'react';
import backIcon from '../../images/icons/back.png';
import { useDispatch, useSelector } from 'react-redux';
import { getPostById, updatePost } from '../../redux/actions/post';
import { Link, Redirect } from 'react-router-dom';
import getBase64 from '../../utils/getBase64';

const Post = ({ match }) => {
    const [action, setAction] = useState(false);
    const [formData, setFormData] = useState();
    const {
        post: { post },
    } = useSelector((state) => state);

    
    const dispatch = useDispatch();

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

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(updatePost({ id: post._id, ...formData }));
        setAction(true)
    };

    useEffect(() => {
        dispatch(getPostById(match.params.post));
    }, [dispatch, match.params.post]);

    useEffect(() => {
        if (post.text)
            setFormData({
                text: post.text,
                img: post.img,
            });
    }, [post]);


    if (action) return <Redirect to={`/p/${match.params.post}`} />;


    return (
        post && (
            <div className='post container-md mx-auto my-4'>
                <div className='post-headline'>
                    <div className='profile-img-post'>
                        <img src={post.profileImage} alt='profile-img' />
                    </div>
                    <div className='profile-user-details'>
                        <h4>{post.name}</h4>
                        <p>@{post.username}</p>
                    </div>
                    <div className='edit-icon'>
                        <Link to={`/p/${match.params.post}`} className='btn'>
                            <img src={backIcon} alt='backIcon' />
                        </Link>
                    </div>
                </div>
                {formData && (
                    <>
                        <div className='post-content'>
                            <form
                                className='post-content-text w-75'
                                onSubmit={submitForm}
                            >
                                <div className='mb-3'>
                                    <input
                                        type='text'
                                        name='text'
                                        className='w-75'
                                        value={formData.text}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className='mb-3'>
                                    {formData.img && (
                                        <div className='post-content-img'>
                                            <img src={formData.img} alt='' />
                                        </div>
                                    )}
                                    <input
                                        className='form-control mt-3'
                                        type='file'
                                        id='formFile'
                                        name='img'
                                        onChange={onChange}
                                    />
                                </div>
                                <button className='btn btn-outline-success'>
                                    Update Post
                                </button>
                            </form>
                        </div>
                    </>
                )}
            </div>
        )
    );
};

export default Post;
