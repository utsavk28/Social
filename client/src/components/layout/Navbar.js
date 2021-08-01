import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './layout.css';

import logo from '../../images/logo/logo.png';
import explore from '../../images/icons/explore.png';
import heart from '../../images/icons/heart.png';
import home from '../../images/icons/home.png';
import messenger from '../../images/icons/messenger.png';
import messenger1 from '../../images/icons/messenger1.png';

const Navbar = ({ location }) => {
    const path = location.pathname.slice(1);
    const {
        auth: { isAuthenticated, user },
        profile: { currProfile },
    } = useSelector((state) => state);
    return (
        <div className='bg-light' style={{opacity:0.8}}>
            <nav className='navbar navbar-light'>
                <div className='container-lg'>
                    <Link className='navbar-brand' to='/'>
                        <img className='nav-img-brand' src={logo} alt='' />
                    </Link>
                    {isAuthenticated && user && currProfile ? (
                        <Fragment>
                            <div className='navbar-search'>
                                <form className='d-flex'>
                                    <input
                                        className='form-control me-'
                                        type='search'
                                        placeholder='Search'
                                        aria-label='Search'
                                    />
                                </form>
                            </div>
                            <div className='d-flex center'>
                                <ul className='nav' id='navbar-panel'>
                                    <li className='nav-item'>
                                        <Link className='nav-link' to='/'>
                                            <img
                                                className='nav-img'
                                                src={home}
                                                alt=''
                                            />
                                        </Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link className='nav-link' to='/inbox'>
                                            {path === 'inbox' ? (
                                                <img
                                                    className='nav-img'
                                                    src={messenger1}
                                                    alt=''
                                                />
                                            ) : (
                                                <img
                                                    className='nav-img'
                                                    src={messenger}
                                                    alt=''
                                                />
                                            )}
                                        </Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link
                                            className='nav-link'
                                            to='/explore'
                                        >
                                            <img
                                                className='nav-img-explore'
                                                src={explore}
                                                alt=''
                                            />
                                        </Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link
                                            className='nav-link'
                                            to='/activity'
                                        >
                                            <img
                                                className='nav-img'
                                                src={heart}
                                                alt=''
                                            />
                                        </Link>
                                    </li>
                                    <li className='nav-item'>
                                        <Link
                                            className='nav-link'
                                            to={`/u/${user.username}`}
                                        >
                                            <div className='profile-img-nav'>
                                                <img
                                                    src={currProfile.profileImg}
                                                    alt='profile-img'
                                                />
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </Fragment>
                    ) : (
                        <div className='d-flex center'>
                            <ul className='nav' id='navbar-panel'>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/register'>
                                        Register
                                    </Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to='/login'>
                                        Login
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
