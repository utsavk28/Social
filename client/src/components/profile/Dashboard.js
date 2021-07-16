import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Dashboard = ({ followers, following, posts }) => {
    const {
        profile: {
            profile: {
                user: { username },
            },
        },
    } = useSelector((state) => state);

    return (
        <div className='connectivity-dashboard'>
            <div className='dashboard-item mr-2 my-2'>
                <Link className='remove-link-style' to={`/u/${username}`}>
                    <b>{posts.length}</b> posts
                </Link>
            </div>
            <div className='dashboard-item m-2'>
                <Link
                    className='remove-link-style'
                    to={`/u/${username}/followers`}
                >
                    <b>{followers.length}</b> followers
                </Link>
            </div>
            <div className='dashboard-item m-2'>
                <Link
                    className='remove-link-style'
                    to={`/u/${username}/following`}
                >
                    <b>{following.length} </b> following
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
