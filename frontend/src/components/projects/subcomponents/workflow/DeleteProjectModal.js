import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { MdClear } from "react-icons/md";

import { deleteProject } from '../../../../actions/projects';

class DeleteProjectModal extends Component {
    constructor(props) {
        super(props);
    }

    confirmDeleteProject = (project) => {
        this.props.deleteProject(this.props.project)
        .then(() => {
            this.props.toggleDeleteProjectModal();
        })
        .catch(err => {
            console.log(err);
        });
    };

    render() {
        return (
            <div className="absolute top left full-view-height full-view-width flex-center" style={{ backgroundColor: 'rgba(43,47,51,0.5)'}}>
                <div className="relative width-600 background-secondary box-shadow padding-32 flex-column">
                    <MdClear size={24} className="absolute cursor-pointer" style={{ top: '10px', right: '10px' }} onClick={() => this.props.toggleDeleteProjectModal()}/>
                    <h2 className="font-size-16">Are you sure you would like to delete the project: {this.props.project.name}</h2>
                    <div className="flex-row justify-space-between">
                        <button className="margin-top-16 border-solid-highlight-2 background-transparent white padding-vertical-16 padding-horizontal-32 cursor-pointer" onClick={() => this.props.toggleDeleteProjectModal()}>Cancel</button>
                        <button className="margin-top-16 border-solid-highlight-1 background-transparent white padding-vertical-16 padding-horizontal-32 align-self-end cursor-pointer" onClick={() => this.confirmDeleteProject(this.props.project)}>Confirm</button>
                    </div>
                </div>
            </div>
        );
    }
}

DeleteProjectModal.propTypes = {
    toggleDeleteProjectModal: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
    deleteProject
};

export default connect(null, mapDispatchToProps)(DeleteProjectModal);