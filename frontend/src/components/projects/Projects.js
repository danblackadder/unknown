import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PulseLoader from "react-spinners/PulseLoader";

import Search from './subcomponents/Search';
import ActionBar from './subcomponents/ActionBar';
import Workflow from './subcomponents/Workflow';

import { getProjects } from '../../actions/projects';
class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            addNewProject: false,
        };
    }

    toggleAddNewProjectInput = () => {
        this.setState({
            addNewProject: !this.state.addNewProject
        });
    }

    componentDidMount = () => {
        this.setState({
            loading: true
        }, () => {
            this.props.getProjects()
            .then(() => {
                this.setState({
                    loading: false
                });
            })
            .catch(err => {
                console.log(err);
            });
        });
    }

    render() {
        return (
            <div className="">
                {this.state.loading ? (
                    <div className="full-view-height background-primary flex-center">
                        <PulseLoader
                            color={'#fff'} />
                    </div>
                ) : (
                        <div className="flex-column padding-16">
                            <Search />
                            <ActionBar toggleAddNewProjectInput={this.toggleAddNewProjectInput} />
                            <Workflow toggleAddNewProjectInput={this.toggleAddNewProjectInput} addNewProject={this.state.addNewProject} />
                        </div>
                    )}
            </div>
        );
    }
}

Projects.propTypes = {
    getProjects: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    getProjects
};

export default connect(null, mapDispatchToProps)(Projects);