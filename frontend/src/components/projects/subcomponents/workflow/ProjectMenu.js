import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    MdDelete,
    MdModeEdit,
    MdClear,
    MdThumbsUpDown
} from 'react-icons/md';

class Projects extends Component {
    constructor(props) {
        super(props);
    };

    toggleDeleteProjectModal = (project) => {
        this.props.toggleProjectMenu();
        this.props.toggleDeleteProjectModal(project);
    }

    toggleEditProjectModal = (project) => {
        this.props.toggleProjectMenu();
        this.props.toggleEditProjectModal(project);
    }

    render() {
        return (
            <div className="absolute right top flex-column background-secondary padding-horizontal-16 padding-top-32 padding-bottom-8 box-shadow" style={{ zIndex: '1'}}>
                <MdClear size={24} className="absolute cursor-pointer" style={{ top: '10px', right: '10px' }} onClick={() => this.props.toggleProjectMenu()}/>
                <div className="flex-row align-items-center cursor-pointer padding-8 hover-underline" onClick={() => this.toggleDeleteProjectModal(this.props.project)}>
                    <MdDelete size={24} className="padding-right-8" /><span>Delete</span>
                </div>
                <div className="flex-row align-items-center cursor-pointer padding-8 hover-underline" onClick={() => this.toggleEditProjectModal(this.props.project)}>
                    <MdModeEdit size={24} className="padding-right-8" /><span>Edit</span>
                </div>
            </div>
        );
    }
}

Projects.propTypes = {
    toggleProjectMenu: PropTypes.func.isRequired,
    toggleDeleteProjectModal: PropTypes.func.isRequired,
    toggleEditProjectModal: PropTypes.func.isRequired,
    project: PropTypes.object
};

export default Projects;