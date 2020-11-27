import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import {
    MdMoreHoriz
} from 'react-icons/md';

import ProjectCard from './workflow/ProjectCard';
class Workflow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board: {
                'Backlog': [],
                'In Progress': [],
                'Completed': []
            }
        };
    };


    render() {
        return (
            <div className="flex-row full-height full-width margin-top-32 flex-wrap">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    {Object.keys(this.state.board).map(type => (
                        <div className={type == 'In Progress' ? 'flex-column flex-1 margin-horizontal-16' : 'flex-column flex-1'} key={type}>
                            <div className="flex-row justify-space-between align-items-center margin-bottom-16">
                                <div className="flex-row align-items-center">
                                    <h5 className="font-size-16">{type}</h5>
                                    <p className="margin-left-8 font-size-16">({this.state.board[type].length})</p>
                                </div>
                                <MdMoreHoriz size={24} className="cursor-pointer" />
                            </div>
                            <div className="padding-8 border-dotted-secondary full-height" onMouseEnter={() => this.toggleWorkflowColumn()} onMouseLeave={() => this.toggleWorkflowColumn()}>
                                <Droppable droppableId={type}>
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="flex-1 full-height"
                                        >
                                            {this.state.board[type].map((project, index) => (
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
                                                                project={project}
                                                                toggleDeleteProjectModal={this.toggleDeleteProjectModal} />
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        </div>
                    ))}
                </DragDropContext>
            </div>
        );
    }
}

Workflow.propTypes = {
};



export default Workflow;