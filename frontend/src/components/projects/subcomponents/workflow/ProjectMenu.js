import React, { Component } from 'react';
import onClickOutside from "react-onclickoutside";

import {
    MdDelete,
    MdModeEdit,
    MdClear
} from 'react-icons/md';

class Projects extends Component {
    constructor(props) {
        super(props);
    };

    handleClickOutside = () => {
        this.props.toggleProjectMenu();
    };

    toggleDeleteProjectModal = (project) => {
        this.props.toggleProjectMenu();
    }

    toggleEditProjectModal = (project) => {
        this.props.toggleProjectMenu();
    }

    render() {
        return (
            <div className="absolute right top flex-column background-secondary padding-horizontal-16 padding-top-32 padding-bottom-8 box-shadow" style={{ zIndex: '1'}}>
                <MdClear size={24} className="absolute cursor-pointer" style={{ top: '10px', right: '10px' }} onClick={() => this.props.toggleProjectMenu()}/>
                <div className="flex-row align-items-center cursor-pointer padding-8 hover-underline" onClick={() => this.toggleEditProjectModal(this.props.project)}>
                    <MdModeEdit size={24} className="padding-right-8" /><span>Edit</span>
                </div>
                <div className="flex-row align-items-center cursor-pointer padding-8 hover-underline" onClick={() => this.toggleDeleteProjectModal(this.props.project)}>
                    <MdDelete size={24} className="padding-right-8" /><span>Delete</span>
                </div>
            </div>
        );
    }
}

export default onClickOutside(Projects);