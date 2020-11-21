import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { MdClear } from "react-icons/md";

import { createProject, editProject } from '../../../actions/projects';

class ProjectModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            name: '',
            workflow: 'Backlog',
            tags: ''
        };
    };

    handleInputChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const project = {
            name: this.state.name,
            workflow: this.state.workflow,
            tags: this.state.tags.split(','),
            owner_id: '5fb3e04d4ac02a4794ae958c'
        };
        if (!this.state.edit) {
            this.props.createProject(project)
            .then(() => {
                this.props.toggleAddNewProjectInput();
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            this.props.editProject(this.props.project._id, project)
            .then(() => {
                this.props.toggleAddNewProjectInput();
            })
            .catch(err => {
                console.log(err);
            });
        };
    };

    componentDidMount = () => {
        if (Object.keys(this.props.project).length > 0) {
            this.setState({
                edit: true,
                name: this.props.project.name,
                workflow: this.props.project.workflow,
                tags: this.props.project.tags.join(",")
            });
        };
    };

    render() {
        return (
            <div className="absolute top left full-view-height full-view-width flex-center" style={{ backgroundColor: 'rgba(43,47,51,0.5)'}}>
                <div className="relative width-600 background-secondary box-shadow padding-32 flex-column">
                    <MdClear size={24} className="absolute cursor-pointer" style={{ top: '10px', right: '10px' }} onClick={() => this.props.toggleAddNewProjectInput()}/>
                    <h2 className="font-size-16">New Project</h2>
                    <input type='text' name='name' value={this.state.name} onChange={(e) => this.handleInputChange(e)} placeholder="Project Name" className="font-size-16 padding-8 full-width border-radius-4 margin-top-16" />
                    <select name='workflow' value={this.state.workflow} onChange={(e) => this.handleInputChange(e)} placeholder="Project Name" className="font-size-16 padding-8 full-width border-radius-4 margin-top-16">
                        <option value="Backlog">Backlog</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                    <input type='text' name="tags" value={this.state.tags} onChange={(e) => this.handleInputChange(e)} placeholder="Tags (comma seperated)" className="font-size-16 padding-8 full-width border-radius-4 margin-top-16" />
                    <button className="margin-top-16 border-solid-highlight-1 background-transparent white padding-vertical-16 padding-horizontal-32 align-self-end cursor-pointer" onClick={(e) => this.handleSubmit(e)}>Submit</button>
                </div>
            </div>
        );
    }
}

ProjectModal.propTypes = {
    toggleAddNewProjectInput: PropTypes.func.isRequired,
    createProject: PropTypes.func.isRequired,
    editProject: PropTypes.func.isRequired,
    project: PropTypes.object
};

const mapDispatchToProps = {
    createProject,
    editProject
};

export default connect(null, mapDispatchToProps)(ProjectModal);