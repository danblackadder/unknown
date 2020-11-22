import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Cookie from "js-cookie";

import { setNavigation } from '../../actions/navigation';

import { 
    MdDashboard,
    MdAssignment, 
    MdSettings
} from 'react-icons/md';
import {
    FaSun,
    FaMoon,
} from 'react-icons/fa';
import Toggle from 'react-toggle';

import WhiteLogo from '../../images/WhiteLogo.svg';
import BlackLogo from '../../images/BlackLogo.svg';
class Navigation extends Component {
    constructor() {
        super();
        this.state = {
            theme: 'light'
        };
    };

    setNavigation = nav => {
        this.props.setNavigation(nav);
        this.props.history.push(nav);
    };

    handleThemeChange = (e) => {
        e.preventDefault();
        let theme = e.target.checked ? 'light' : 'dark';
        this.setState({
            theme: theme
        });
        Cookie.set('theme', theme);
        let script = document.getElementById('theme');
        script.href =  `style/${theme}.css`;
    };

    componentDidMount = () => {
        if (Cookie.get('theme')) {
            this.setState({
                theme: Cookie.get('theme')
            });
        };
    };

    render() {
        return (
            <div className="fixed full-height width-300 background-secondary flex-column">
                <img
                    src={this.state.theme == 'dark' ? WhiteLogo : BlackLogo}
                    alt="Taskception"
                    className="width-100 margin-vertical-64 align-self-center"
                />
                <div className="flex-column flex-1 justify-space-between">
                    <div className="flex-column">
                        <a className={this.props.navigation == 'dashboard' ? "font-size-16 padding-16 width-full flex-row align-items-center background-highlight-2 highlight-1 cursor-pointer" : "font-size-16 padding-16 width-full flex-row align-items-center cursor-pointer"} style={this.props.navigation == 'dashboard' ? { borderRight: (this.state.theme == 'dark' ? '5px solid #007DFF' : '5px solid #FD7B38') } : null} onClick={() => this.setNavigation('dashboard')}><MdDashboard size={24} className="margin-right-8" />DASHBOARD</a>

                        <a className={this.props.navigation == 'projects' ? "font-size-16 padding-16 width-full flex-row align-items-center background-highlight-2 highlight-1 cursor-pointer" : "font-size-16 padding-16 width-full flex-row align-items-center cursor-pointer"} style={this.props.navigation == 'projects' ? { borderRight: (this.state.theme == 'dark' ? '5px solid #007DFF' : '5px solid #FD7B38') } : null} onClick={() => this.setNavigation('projects')}><MdAssignment size={24} className="margin-right-8" />PROJECTS</a>

                        <a className={this.props.navigation == 'auth' ? "font-size-16 padding-16 width-full flex-row align-items-center background-highlight-2 highlight-1 cursor-pointer" : "font-size-16 padding-16 width-full flex-row align-items-center cursor-pointer"} style={this.props.navigation == 'auth' ? { borderRight: (this.state.theme == 'dark' ? '5px solid #007DFF' : '5px solid #FD7B38') } : null} onClick={() => this.setNavigation('auth')}><MdAssignment size={24} className="margin-right-8" />AUTH</a>
                    </div>
                    <div className="flex-column margin-bottom-8">
                        <label className="margin-left-16 margin-bottom-16 flex-row align-items-center">
                            <Toggle
                                checked={this.state.theme == 'light' ? true : false}
                                icons={{
                                checked: <FaSun color='#65676D' />,
                                unchecked: <FaMoon />,
                                }}
                                onChange={(e) => this.handleThemeChange(e)} />
                            <span className="font-size-16 margin-left-16">Theme</span>
                        </label>
                        <a className={this.props.navigation == 'settings' ? "font-size-16 padding-16 width-full flex-row align-items-center background-highlight-2 highlight-1 cursor-pointer" : "font-size-16 padding-16 width-full flex-row align-items-center cursor-pointer"} style={this.props.navigation == 'settings' ? { borderRight: (this.state.theme == 'dark' ? '5px solid #007DFF' : '5px solid #FD7B38') } : null} onClick={() => this.setNavigation('settings')}><MdSettings size={24} className="margin-right-8" />SETTINGS</a>
                    </div>
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
    navigation: state.navigation,
});

const mapDispatchToProps = {
    setNavigation,
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navigation));