import React, { Fragment } from 'react';
import loader from './loader.gif';
import logo from '../../images/logo/logo.png';
const Loader = () => {
    return (
        <Fragment>
            <div className='loading-container'>
                <div className="loader-container" >
                    <div className='logo'>
                        <img src={logo} alt='' />
                    </div>
                    <div className='loader'>
                        <img src={loader} alt='Loading...' />
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Loader;
