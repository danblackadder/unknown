import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Authentication from './src/components/authentication/Authentication.js';
import Dashboard from './src/components/dashboard/Dashboard.js';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path={'/dashboard'} component={Dashboard} />
                <Route path={'/'} component={Authentication} />
            </Switch>
        </Router>
    );
};

export default App;