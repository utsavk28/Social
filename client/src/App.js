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
import Explore from './components/explore/Explore';
import HomePage from './components/home/HomePage';
import PostPage from './components/post/PostPage';
import EditPost from './components/post/EditPost';
import DeletePost from './components/post/DeletePost';
import Following from './components/profile/Following';
import Follower from './components/profile/Follower';
import { getSavedPost } from './redux/actions/savedposts';
import Messenger from './components/messenger/Messenger';
import UserChat from './components/messenger/UserChat';
import Page404 from './components/layout/Page404';

function App() {
    const dispatch = useDispatch();
    const {
        auth: { loading: authLoading },
        profile: { loading: profileLoading },
    } = useSelector((state) => state);

    useEffect(() => {
        dispatch(loadUser());
        dispatch(getSavedPost());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return authLoading && profileLoading ? (
        <Loader />
    ) : (
        <div className='main-container'>
            <Router>
                <Route path='/' component={Navbar} />
                <Alert />
                <div>
                    <Switch>
                        <PrivateRoute exact path='/' component={HomePage} />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/explore' component={Explore} />
                        <Route exact path='/u/:username' component={Profile} />
                        <Route
                            exact
                            path='/u/:username/followers'
                            component={Follower}
                        />
                        <Route
                            exact
                            path='/u/:username/following'
                            component={Following}
                        />
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
                        <Route exact path='/activity' component={test} />
                        <Route exact path='/inbox' component={Messenger} />
                        <PrivateRoute
                            exact
                            path='/inbox/:id'
                            component={UserChat}
                        />
                        <Route path='/404' component={Page404} />
                        <Route path='' component={Page404} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
