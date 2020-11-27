import React, { Component } from 'react';

import PulseLoader from "react-spinners/PulseLoader";

import Search from './subcomponents/Search';
import ActionBar from './subcomponents/ActionBar';
import Workflow from './subcomponents/Workflow';
class Projects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            addNewProject: false,
        };
    }

    componentDidMount = () => {
        this.setState({
            loading: true
        }, () => {
            this.setState({
                loading: false
            });
        });
    }

    render() {
        return (
            <div className="full-height">
                {this.state.loading ? (
                    <div className="full-view-height background-primary flex-center">
                        <PulseLoader
                            color={'#fff'} />
                    </div>
                ) : (
                        <div className="flex-column padding-16 full-height">
                            <Search />
                            <ActionBar />
                            <Workflow />
                        </div>
                    )}
            </div>
        );
    }
}


export default Projects;