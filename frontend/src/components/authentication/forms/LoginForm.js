import React, { Component } from 'react';
import axios from 'axios';

class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            email: '',
            password: ''
        };
    };

    handleInputChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        axios.post('/api/users/login', user)
            .then((res, err) => {
                if (err) console.log(err);
                console.log(res);
                localStorage.setItem('tcToken', res.data.token);
                window.location.href = '/dashboard'; 
            });
    }
  
    render() {
        return (
            <div style={{ maxWidth: '300px', width: '100%' }}>
                <form onSubmit={(e) => this.handleSubmit(e)} className="flex-column justify-space-around margin-left">
                    <label>
                        Email
                    </label>
                    <input type="email" name="email" value={this.state.email} onChange={(e) => this.handleInputChange(e)} className="margin-vertical-8 padding-8"></input>
                    <label>
                        Password
                    </label>
                    <input type="password" name="password" value={this.state.password} onChange={(e) => this.handleInputChange(e)} className="margin-vertical-8 padding-8"></input>
                    <div className="flex-row justify-space-between margin-top-8">
                        <div className="flex-column">
                            <p>Don't have an account?</p>
                            <p className="cursor-pointer weight-bold" onClick={() => this.props.handleToggle()}>Register Here</p>
                        </div>
                        <input className="padding-vertical-8 padding-horizontal-16 cursor-pointer background-primary white border-white-solid border-highlight-1-hover" type="submit" value="Submit"></input>
                    </div>
                </form>
            </div>
        );
    }
}

export default RegisterForm;