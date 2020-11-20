import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { MdClear } from "react-icons/md";


class NewProjectModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

    handleInputChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const project = {
            name: this.state.name,
            owner_id: '5fb3e04d4ac02a4794ae958c'
        };
        axios.post('/api/projects', project)
            .then((res, err) => {
                if (err) console.log(err);
                this.props.toggleAddNewProjectInput();
                this.setState({
                    name: ''
                });
            });
    }

    render() {
        return (
            <div className="absolute top left full-view-height full-view-width flex-center" style={{ backgroundColor: 'rgba(43,47,51,0.5)'}}>
                <div className="relative height-200 width-600 background-secondary box-shadow padding-32 flex-column">
                    <MdClear size={24} className="absolute cursor-pointer" style={{ top: '10px', right: '10px' }} onClick={() => this.props.toggleAddNewProjectInput()}/>
                    <h2 className="font-size-16">New Project</h2>
                    <input type='text' name='name' value={this.state.name} onChange={(e) => this.handleInputChange(e)} placeholder="Project Name" className="font-size-16 padding-8 full-width border-radius-4 margin-top-16" />
                    <button className="margin-top-16 border-solid-highlight-1 background-transparent white padding-vertical-16 padding-horizontal-32 align-self-end cursor-pointer" onClick={(e) => this.handleSubmit(e)}>Submit</button>
                </div>
            </div>
        );
    }
}

NewProjectModal.propTypes = {
    toggleAddNewProjectInput: PropTypes.func.isRequired,
};

export default NewProjectModal;