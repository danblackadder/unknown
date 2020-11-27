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
import Settings from './components/settings/Settings';

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

if (Cookie.get('theme')) {
    if (Cookie.get('theme') == 'dark') {
        theme.href = 'style/dark.css';
    } else {
        theme.href = 'style/light.css';
    }
} else {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const theme = document.getElementById('theme');

    if (prefersDarkScheme.matches) {
        Cookie.set('theme', 'dark');
        theme.href = 'style/dark.css';
    } else {
        Cookie.set('theme', 'light');
        theme.href = 'style/light.css';
    };
};

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Navigation />
                <div className="full-height" style={{ marginLeft: '300px' }}>
                    <Switch>
                        <Route path={'/dashboard'} component={Dashboard} />
                        <Route path={'/projects'} component={Projects} />
                        <Route path={'/settings'} component={Settings} />
                        <Route path={'/'} component={Authentication} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
};

export default App;