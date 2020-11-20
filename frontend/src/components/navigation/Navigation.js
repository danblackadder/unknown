import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MdDashboard, MdAssignment } from 'react-icons/md';

import logo from '../../images/Logo.svg';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }


    render() {
        return (
            <div className="fixed full-height width-300 background-secondary flex-column" style={{ border: '16px solid #2B2F33', borderRadius: '20px'}}>
                <img
                    src={logo}
                    alt="Taskception"
                    className="width-100 margin-vertical-64 align-self-center"
                />
                <div className="flex-column">
                    <a href="/" className="font-size-16 padding-16 width-full flex-row align-items-center background-highlight-2 highlight-1" style={{ borderRight: '5px solid #007DFF'}}><MdDashboard size={24} className="margin-right-8" />DASHBOARD</a>
                    <a href="/projects" className="font-size-16 margin-8 padding-8 flex-row align-items-center"><MdAssignment size={24} className="margin-right-8" />PROJECTS</a>
                    <a href="/auth" className="font-size-16 margin-8 padding-8 flex-row align-items-center"><MdAssignment size={24} className="margin-right-8" />AUTH</a>
                </div>
            </div>
        );
    }
}

export default Navigation;