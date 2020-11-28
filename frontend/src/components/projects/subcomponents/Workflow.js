import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import {
    MdMoreHoriz
} from 'react-icons/md';

import BoardColumn from './workflow/BoardColumn';

import { updateBoard } from '../../../actions/board';
class Workflow extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        let board = Object.assign({}, this.props.board);

        // remove from current list
        const [card] = board[result.source.droppableId].splice(result.source.index, 1);

        card.workflow = result.destination.droppableId;
        // add to new list
        board[result.destination.droppableId].splice(result.destination.index, 0, card);

        let board_array = [];
        Object.keys(board).map(workflow => {
            if (board[workflow].length > 0) {
                board[workflow].map((project, index) => {
                    board[workflow][index].index = index;
                    if (index == board[workflow].length -1) {
                        board_array.push(...board[workflow]);
                        if (workflow == Object.keys(board)[Object.keys(board).length - 1]) {
                            this.props.updateBoard(board_array);
                        };
                    };
                });
            } else {
                if (workflow == Object.keys(board)[Object.keys(board).length - 1]) {
                    this.props.updateBoard(board_array);
                };
            }
        });
    }

    render() {
        return (
            <div className="flex-row full-height full-width margin-top-32 flex-wrap">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    {Object.keys(this.props.board).map(type => (
                        <div className={type == 'In Progress' ? 'flex-column flex-1 margin-horizontal-16' : 'flex-column flex-1'} key={type}>
                            <div className="flex-row justify-space-between align-items-center margin-bottom-16">
                                <div className="flex-row align-items-center">
                                    <h5 className="font-size-16">{type}</h5>
                                    <p className="margin-left-8 font-size-16">({this.props.board[type].length})</p>
                                </div>
                                <MdMoreHoriz size={24} className="cursor-pointer" />
                            </div>
                            <BoardColumn board={this.props.board} type={type} onDragEnd={this.onDragEnd} />
                        </div>
                    ))}
                </DragDropContext>
            </div>
        );
    }
}

Workflow.propTypes = {
};

const mapStateToProps = state => ({
    board: state.board
});

const mapDispatchToProps = {
    updateBoard
};

export default connect(mapStateToProps, mapDispatchToProps)(Workflow);