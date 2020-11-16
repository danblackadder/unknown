import React, { Component } from 'react';
import axios from 'axios';

class RegisterForm extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            first_name: '',
            last_name: '',
            email: '',
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
        console.log(this.state.first_name, this.state.last_name, this.state.email);
        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email
        };
        axios.post('/api/users/register', user)
            .then((res, err) => {
                if (err) console.log(err);
                console.log(res);
                this.props.handleToggle();
            });
    }
  
    render() {
        return (
            <div className="width-300">
                <form onSubmit={(e) => this.handleSubmit(e)} className="flex-column justify-space-around margin-left">
                    <label>
                        First name
                    </label>
                    <input type="text" name="first_name" value={this.state.first_name} onChange={(e) => this.handleInputChange(e)} className="margin-vertical-8 padding-8"></input>
                    <label>
                        Last Name
                    </label>
                    <input type="text" name="last_name" value={this.state.last_name} onChange={(e) => this.handleInputChange(e)} className="margin-vertical-8 padding-8"></input>
                    <label>
                        Email
                    </label>
                    <input type="email" name="email" value={this.state.email} onChange={(e) => this.handleInputChange(e)} className="margin-vertical-8 padding-8"></input>
                    <div className="flex-row justify-space-between margin-top-8">
                        <div className="flex-column">
                            <p>Already have an account?</p>
                            <p className="cursor-pointer weight-bold" onClick={() => this.props.handleToggle()}>Login Here</p>
                        </div>
                        <input className="padding-vertical-8 padding-horizontal-16 cursor-pointer background-primary white border-white-solid border-highlight-1-hover" type="submit" value="Submit"></input>
                    </div>
                </form>
            </div>
        );
    }
}

export default RegisterForm;