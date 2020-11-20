import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import jwt_decode from 'jwt-decode';
import axios from 'axios';
import Cookie from "js-cookie";

import Navigation from './components/navigation/Navigation';

import Authentication from './components/authentication/Authentication';
import Dashboard from './components/dashboard/Dashboard';
import Projects from './components/projects/Projects';

import store from './store';
import { logout } from './actions/authentication';

if (Cookie.get('token')) {
    const token = jwt_decode(Cookie.get('token'));
    const currentTime = Date.now() / 1000;
    if (token.exp < currentTime) {
        store.dispatch(logout());
    } else {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cookie.get('token');
    };
}

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Navigation />
                <div style={{ marginLeft: '300px' }}>
                    <Switch>
                        <Route path={'/auth'} component={Authentication} />
                        <Route path={'/projects'} component={Projects} />
                        <Route path={'/'} component={Dashboard} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
};

export default App;