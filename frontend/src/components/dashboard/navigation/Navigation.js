import React, { Component } from 'react';
import axios from 'axios';
import { FaCheck } from 'react-icons/fa';

import logo from '../../../images/Logo.svg';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            addNewProject: false,
            new_project: ''
        };
    }

    handleInputChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    toggleAddNewProjectInput = () => {
        this.setState({
            addNewProject: !this.state.addNewProject
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const project = {
            name: this.state.new_project,
        };
        axios.post('/api/projects', project)
            .then((res, err) => {
                if (err) console.log(err);
                console.log(res);
                this.toggleAddNewProjectInput();
                this.loadProjects();
                this.setState({
                    new_project: ''
                });
            });
    }

    loadProjects = () => {
        axios.get('/api/projects/')
        .then((res, err) => {
            if (err) console.log(err);
            console.log(res);
            this.setState({
                projects: res.data
            });
        });
    }

    logout = () => {
        localStorage.removeItem('taskception.tcToken');
        delete axios.defaults.headers.common['Authorization'];
        window.location.href = '/';
    }

    componentDidMount = () => {
        this.loadProjects();
    }

    render() {
        return (
            <div className="full-view-height width-300 background-highlight-1 flex-column padding-horizontal-16">
                <img
                    src={logo}
                    alt="Taskception"
                    className="width-100 margin-top-16 margin-bottom-64 align-center"
                />
                <h3>Projects:</h3>
                {this.state.projects.length > 0 ? (
                    this.state.projects.map(project => (
                        <div className="border-white-solid padding-vertical-4 padding-left-8 margin-top-8 cursor-pointer" style={{ fontSize: '18px' }}>{project.name}</div>
                    ))
                ) : null}
                {this.state.addNewProject ? (
                    <form onSubmit={(e) => this.handleSubmit(e)} className="flex-row padding-vertical-8">
                        <input type="text" name="new_project" value={this.state.new_project} onChange={(e) => this.handleInputChange(e)} className="padding-8 flex-1"></input>
                        <input className="" type="submit" value="Submit" hidden></input>
                        <button className="flex-center border-white-solid padding-horizontal-4 margin-left-4 background-highlight-1 white cursor-pointer" onClick>
                            <FaCheck style={{ fontSize: '18px' }} />
                        </button>
                    </form>
                ) : (
                    <button className="background-highlight-1 border-white-solid padding-8 white margin-top-8 cursor-pointer" onClick={() => this.toggleAddNewProjectInput()}>Add New</button>
                )}
                <button className="cursor-pointer background-white box-shadow padding-8 margin-top-auto margin-bottom-16 box-shadow-hover" onClick={() => this.logout()}>Logout</button>
            </div>
        );
    }
}

export default Navigation;