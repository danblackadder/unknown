import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    MdViewWeek,
    MdMenu,
    MdAdd,
} from 'react-icons/md';

class ActionBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="margin-top-32 align-self-start flex-row full-width justify-space-between">
                <div className="background-secondary flex-row align-items-center cursor-pointer" style={{ borderRadius: '8px' }}>
                    <div className="padding-16">
                        <MdMenu size={24} />
                    </div>
                    <div className="padding-16 border-solid-highlight-1 background-highlight-2 highlight-1 cursor-pointer" >
                        <MdViewWeek size={24} />
                    </div>
                </div>
                <div className="padding-16 background-highlight-1 white flex-center border-solid-highlight-1 cursor-pointer" style={{ borderRadius: '8px' }} onClick={() => this.props.toggleAddNewProjectInput()}>
                    <MdAdd size={24} />
                </div>
            </div>
        );
    }
}

ActionBar.propTypes = {
    toggleAddNewProjectInput: PropTypes.func.isRequired
};


export default ActionBar;