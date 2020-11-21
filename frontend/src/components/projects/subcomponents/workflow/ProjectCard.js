import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    MdMoreHoriz,
    MdLibraryBooks
} from 'react-icons/md';

import ProjectMenu from './ProjectMenu';

class ProjectCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectMenu: false,
            deleteProjectModal: false
        };
    };

    toggleProjectMenu = () => {
        this.setState({
            projectMenu: !this.state.projectMenu
        });
    };

    render() {
        return (
            <div className="background-secondary padding-16 full-width border-radius-4 flex-column margin-bottom-16 relative" key={this.props.project._id}>
                <div className="flex-row justify-space-between margin-bottom-16">
                    <h2 className="font-size-16 flex-1" style={{ wordBreak: 'break-word' }}>{this.props.project.name}</h2>
                    <MdMoreHoriz size={24} className="cursor-pointer margin-left-8" onClick={() => this.toggleProjectMenu()}/>
                    {this.state.projectMenu ? (
                        <ProjectMenu 
                            toggleDeleteProjectModal={this.props.toggleDeleteProjectModal} 
                            toggleEditProjectModal={this.props.toggleEditProjectModal} 
                            toggleProjectMenu={this.toggleProjectMenu} 
                            project={this.props.project}/> 
                    ) : null}
                </div>
                {this.props.project.tags.length > 0 ? (
                    <div className="flex-row margin-bottom-16">
                        {this.props.project.tags.map(tag => (
                            <div className="background-highlight-1 padding-4 border-radius-4 margin-right-4 text-uppercase font-size-12 cursor-pointer" key={tag}>{tag}</div>
                        ))}
                    </div>
                ) : null}

                <div className="flex-row justify-space-between">
                    <div className="cursor-pointer" style={{ borderRadius: '100%', height: '28px', width: '28px', backgroundColor: '#fff' }} />
                    <div className="flex-row align-items-center">
                        {this.props.project.tasks} <MdLibraryBooks size={16} className="margin-left-4" />
                    </div>
                </div>
            </div>
        );
    }
}

ProjectCard.propTypes = {
    projects: PropTypes.object,
    project: PropTypes.object,
    toggleDeleteProjectModal: PropTypes.func.isRequired,
    toggleEditProjectModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    projects: state.projects,
});


export default connect(mapStateToProps)(ProjectCard);