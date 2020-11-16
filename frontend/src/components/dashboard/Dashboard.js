import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

import PulseLoader from "react-spinners/PulseLoader";

import Navigation from './navigation/Navigation.js';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    noToken = () => {
        localStorage.removeItem('taskception.tcToken');
        delete axios.defaults.headers.common['Authorization'];
        window.location.href = '/';
    }
    
    componentDidMount = () => {
        if (localStorage.tcToken) {
            const token = jwt_decode(localStorage.tcToken);
            const currentTime = Date.now() / 1000;
            if (token.exp < currentTime) {
                this.noToken();
            } else {
                axios.defaults.headers.common['Authorization'] = localStorage.tcToken;
                this.setState({
                    loading: false
                });
            };
        } else {
            this.noToken();
        };
    }

    render() {
        return (
            <div>
                {this.state.loading ? (
                    <div className="full-view-height full-view-width flex-center">
                        <PulseLoader 
                            color={'#fff'} />
                    </div>
                ) : (
                    <Navigation />
                )}
            </div>
        );
    }
}

export default Dashboard;