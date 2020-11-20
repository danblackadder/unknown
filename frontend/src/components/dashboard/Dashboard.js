import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PulseLoader from "react-spinners/PulseLoader";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    render() {
        return (
            <div>
                <div className="full-view-height background-secondary flex-center padding-16" style={{ border: '16px solid #2B2F33', borderRadius: '20px' }}>
                    <PulseLoader 
                        color={'#fff'} />
                </div>
            </div>
        );
    }
}

export default Dashboard;