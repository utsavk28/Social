import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import test from './components/test';

import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './utils/PrivateRoute';
import { loadUser } from './redux/actions/auth';
import Alert from './components/layout/Alert';
import Loader from './components/layout/Loader';
import Profile from './components/profile/Profile';
import HomePage from './components/home/HomePage';
import PostPage from './components/post/PostPage';
import EditPost from './components/post/EditPost';
import DeletePost from './components/post/DeletePost';

function App() {
    const dispatch = useDispatch();
    const {
        auth: { loading: authLoading },
        profile: { loading: profileLoading },
    } = useSelector((state) => state);

    useEffect(() => {
        dispatch(loadUser());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return authLoading && profileLoading ? (
        <Loader />
    ) : (
        <div className='main-container'>
            <Router>
                <Navbar />
                <Alert />
                <div>
                    <Switch>
                        <PrivateRoute exact path='/' component={HomePage} />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/explore' component={test} />
                        <Route exact path='/u/:username' component={Profile} />
                        <PrivateRoute
                            exact
                            path='/u/:username/update'
                            component={Profile}
                        />
                        <Route exact path='/p/:post' component={PostPage} />
                        <Route
                            exact
                            path='/p/:post/edit'
                            component={EditPost}
                        />
                        <Route
                            exact
                            path='/p/:post/delete'
                            component={DeletePost}
                        />
                        <Route exact path='/c/:comment' component={test} />
                        <Route exact path='/activity' component={test} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
