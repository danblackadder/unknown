import React, { Component } from 'react';

import PuffLoader from "react-spinners/PuffLoader";

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
                    <PuffLoader 
                        color={'#fff'} />
                </div>
            </div>
        );
    }
}

export default Dashboard;