import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { setNavigation } from '../../actions/navigation';

import { MdDashboard, MdAssignment } from 'react-icons/md';

import logo from '../../images/Logo.svg';
class Navigation extends Component {

    setNavigation = nav => {
        this.props.setNavigation(nav);
        this.props.history.push(nav);
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

                    <a className={this.props.navigation == 'dashboard' ? "font-size-16 padding-16 width-full flex-row align-items-center background-highlight-2 highlight-1 cursor-pointer" : "font-size-16 padding-16 width-full flex-row align-items-center cursor-pointer"} style={this.props.navigation == 'dashboard' ? { borderRight: '5px solid #007DFF'} : null} onClick={() => this.setNavigation('dashboard')}><MdDashboard size={24} className="margin-right-8" />DASHBOARD</a>

                    <a className={this.props.navigation == 'projects' ? "font-size-16 padding-16 width-full flex-row align-items-center background-highlight-2 highlight-1 cursor-pointer" : "font-size-16 padding-16 width-full flex-row align-items-center cursor-pointer"} style={this.props.navigation == 'projects' ? { borderRight: '5px solid #007DFF'} : null} onClick={() => this.setNavigation('projects')}><MdAssignment size={24} className="margin-right-8" />PROJECTS</a>

                    <a className={this.props.navigation == 'auth' ? "font-size-16 padding-16 width-full flex-row align-items-center background-highlight-2 highlight-1 cursor-pointer" : "font-size-16 padding-16 width-full flex-row align-items-center cursor-pointer"} style={this.props.navigation == 'auth' ? { borderRight: '5px solid #007DFF'} : null} onClick={() => this.setNavigation('auth')}><MdAssignment size={24} className="margin-right-8" />AUTH</a>
                </div>
            </div>
        );
    }
}

Navigation.propTypes = {
    history: PropTypes.object.isRequired,
    navigation: PropTypes.string,
    setNavigation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    navigation: state.navigation
});

const mapDispatchToProps = {
    setNavigation
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation));