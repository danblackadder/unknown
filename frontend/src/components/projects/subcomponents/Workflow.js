import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    MdMoreHoriz
} from 'react-icons/md';

import ProjectCard from './workflow/ProjectCard';
import ProjectModal from './ProjectModal';
import DeleteProjectModal from './workflow/DeleteProjectModal';
class Workflow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: {},
            deleteProjectModal: false,
            editProjectModal: false
        };
    };

    toggleDeleteProjectModal = (project) => {
        this.setState({
            project: project,
            deleteProjectModal: !this.state.deleteProjectModal
        });
    };

    toggleEditProjectModal = (project) => {
        this.setState({
            project: project
        }, () => {
            this.props.toggleAddNewProjectInput();
        });
    };

    render() {
        return (
            <div className="flex-row full-width margin-top-32 flex-wrap">
                {Object.keys(this.props.projects).map(type => (
                    <div className={type == 'In Progress' ? 'flex-column flex-1 margin-horizontal-16' : 'flex-column flex-1'} key={type}>
                        <div className="flex-row justify-space-between align-items-center margin-bottom-16">
                            <div className="flex-row align-items-center">
                                <h5 className="font-size-16">{type}</h5>
                                <p className="margin-left-8 font-size-16">({this.props.projects[type].length})</p>
                            </div>
                            <MdMoreHoriz size={24} className="cursor-pointer" />
                        </div>
                        {this.props.projects[type].map(project => (
                            <ProjectCard 
                                key={project._id}
                                project={project}
                                toggleDeleteProjectModal={this.toggleDeleteProjectModal}
                                toggleEditProjectModal={this.toggleEditProjectModal} />
                        ))}
                    </div>
                ))}
                {this.props.addNewProject ? (
                    <ProjectModal
                        project={this.state.project}
                        toggleAddNewProjectInput={this.props.toggleAddNewProjectInput} />
                ) : null}
                {this.state.deleteProjectModal ? <DeleteProjectModal project={this.state.project} toggleDeleteProjectModal={this.toggleDeleteProjectModal} /> : null}
            </div>
        );
    }
}

Workflow.propTypes = {
    projects: PropTypes.object,
    addNewProject: PropTypes.bool,
    toggleAddNewProjectInput: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    projects: state.projects,
});


export default connect(mapStateToProps)(Workflow);