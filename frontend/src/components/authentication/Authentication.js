import React, { Component } from 'react';
import Cookie from 'js-cookie';

import RegisterForm from './forms/RegisterForm.js';
import LoginForm from './forms/LoginForm.js';

import BlackLogo from './../../images/BlackLogo.svg';
import WhiteLogo from './../../images/WhiteLogo.svg';
class Authentication extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            register: false,
            theme: 'dark'
        };
    };

    handleToggle = () => {
        this.setState({
            register: !this.state.register
        });
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
            <div className="container full-view-height flex-center">
                <div className="full-width flex-row justify-space-around">
                    <img
                        src={this.state.theme == 'dark' ? WhiteLogo : BlackLogo}
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