import React, { Component } from 'react';
import { connect } from 'react-redux';

import PuffLoader from "react-spinners/PuffLoader";

import Search from './subcomponents/Search';
import ActionBar from './subcomponents/ActionBar';
import Workflow from './subcomponents/Workflow';

import { getBoard } from '../../actions/board';
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
            this.props.getBoard()
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
            <div className="full-height">
                {this.state.loading ? (
                    <div className="full-view-height background-primary flex-center">
                        <PuffLoader
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


const mapDispatchToProps = {
    getBoard
};


export default connect(null, mapDispatchToProps)(Projects);