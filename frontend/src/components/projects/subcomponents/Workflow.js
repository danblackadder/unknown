import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    MdMoreHoriz,
    MdSubdirectoryArrowRight
} from 'react-icons/md';

class Projects extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="flex-row full-width margin-top-32 flex-wrap">
                {Object.keys(this.props.projects).map(type => (
                    <div className={type == 'In Progress' ? 'flex-column flex-1 margin-horizontal-16' : 'flex-column flex-1'}>
                        <div className="flex-row justify-space-between align-items-center margin-bottom-16">
                            <h5 className="font-size-16">{type}</h5>
                            <MdMoreHoriz size={24} className="cursor-pointer" />
                        </div>
                        {this.props.projects[type].map(project => (
                            <div className="background-secondary padding-16 full-width border-radius-4 flex-column margin-bottom-16" key={project._id}>
                                <div className="flex-row justify-space-between margin-bottom-16">
                                    <h2 className="font-size-16">{project.name}</h2>
                                    <MdMoreHoriz size={24} className="cursor-pointer" />
                                </div>
                                <div className="flex-row justify-space-between">
                                    <div className="cursor-pointer" style={{ borderRadius: '100%', height: '28px', width: '28px', backgroundColor: '#fff' }} />
                                    <div className="flex-row align-items-center">
                                        {project.tasks} <MdSubdirectoryArrowRight size={16} className="margin-left-4" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}

Projects.propTypes = {
    projects: PropTypes.object,
};

const mapStateToProps = state => ({
    projects: state.projects,
});


export default connect(mapStateToProps)(Projects);