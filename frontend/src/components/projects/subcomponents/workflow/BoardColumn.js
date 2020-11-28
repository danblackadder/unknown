

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import { MdDone, MdClose } from "react-icons/md";
import PuffLoader from "react-spinners/PuffLoader";

import ProjectCard from './ProjectCard';

import { createProject } from '../../../../actions/project';

class BoardColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addNewProject: false,
            addNewProjectField: false,
            new_project: '',
            loadingNewProject: false
        };
    };

    toggleAddNewProjectButtonEnter = () => {
        if (!this.state.addNewProjectField && !this.state.loadingNewProject) {
            this.setState({
                addNewProject: true
            });
        };
    };

    toggleAddNewProjectButtonLeave = () => {
        this.setState({
            addNewProject: false
        });
    };

    handleAddNewProject = () => {
        this.setState({
            addNewProject: false,
            addNewProjectField: true
        });
    };

    handleCancelAddNewProject = () => {
        this.setState({
            addNewProject: false,
            addNewProjectField: false,
            new_project: ''
        });
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleAddNewProjectSubmit = () => {
        let project = {
            name: this.state.new_project,
            board: this.props.board_id,
            workflow: this.props.type,
            index: this.props.board[this.props.type].length,
        };
        this.setState({
            loadingNewProject: true,
            addNewProject: false,
            addNewProjectField: false,
        }, () => {
            this.props.createProject(project)
                .then(() => {
                    this.setState({
                        loadingNewProject: false,
                        new_project: ''
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        });
    };

    render() {
        return (
            <div className="padding-8 border-dotted-secondary full-height" onMouseEnter={() => this.toggleAddNewProjectButtonEnter()} onMouseLeave={() => this.toggleAddNewProjectButtonLeave()}>
                <Droppable droppableId={this.props.type}>
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="flex-1 full-height"
                        >
                            {this.props.board[this.props.type].map((project, index) => (
                                <Draggable
                                    key={project._id}
                                    draggableId={project._id}
                                    index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            className="margin-bottom-16"
                                        >
                                            <ProjectCard
                                                project={project} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                            {this.state.addNewProject ? (<div className="full-width padding-8 flex-center border-solid-highlight-1 font-size-16 cursor-pointer" onClick={() => this.handleAddNewProject()}>Add New Project</div>) : null}
                            {this.state.addNewProjectField ? (
                                <div className="flex-row">
                                    <input type='text' name='new_project' placeholder='New Project Name' value={this.state.new_project} onChange={(e) => this.handleInputChange(e)} className="padding-8 flex-center border-solid-highlight-1 font-size-16 flex-1" />
                                    <div className="border-solid-highlight-1 flex-center padding-8 cursor-pointer margin-left-4" onClick={() => this.handleAddNewProjectSubmit()}>
                                        <MdDone size={16} />
                                    </div>
                                    <div className="border-solid-highlight-1 flex-center padding-8 cursor-pointer margin-left-4" onClick={() => this.handleCancelAddNewProject()}>
                                        <MdClose size={16} />
                                    </div>
                                </div>
                            ) : null}
                            {this.state.loadingNewProject ? (
                                <div className="background-secondary padding-16 full-width border-radius-4 flex-column relative flex-center">
                                    <PuffLoader
                                        color={'#fff'} />
                                </div>
                            ) : null}
                        </div>
                    )}
                </Droppable>
            </div>
        );
    }
}

BoardColumn.propTypes = {
};

const mapStateToProps = state => ({
    board_id: state.board_id,
});

const mapDispatchToProps = {
    createProject
};


export default connect(mapStateToProps, mapDispatchToProps)(BoardColumn);