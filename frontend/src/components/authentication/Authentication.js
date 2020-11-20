import React, { Component } from 'react';
import PropTypes from 'prop-types';

import logo from './../../images/Logo.svg';
import RegisterForm from './forms/RegisterForm.js';
import LoginForm from './forms/LoginForm.js';

class Authentication extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            register: false
        };
    };

    handleToggle = () => {
        this.setState({
            register: !this.state.register
        });
    };
  
    render() {
        return (
            <div className="container full-view-height flex-center">
                <div className="full-width flex-row justify-space-around">
                    <img
                        src={logo}
                        alt="Taskception"
                    />
                    {this.state.register ? (
                        <RegisterForm 
                            handleToggle={() => this.handleToggle()} />
                    ) : (
                        <LoginForm
                            handleToggle={() => this.handleToggle()} />
                    )}
                </div>
            </div>
        );
    }
}
 
export default Authentication;