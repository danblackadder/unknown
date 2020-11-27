import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    MdNotificationsNone,
    MdSearch,
} from 'react-icons/md';

import defaultImage from '../../../images/default.png';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <div className="background-secondary flex-row align-items-center padding-vertical-16 padding-horizontal-32" style={{ borderRadius: '8px' }}>
                <MdSearch size={24} />
                <input type="text" className="padding-8 background-secondary white font-size-16 margin-horizontal-8 flex-1 placeholder-white" placeholder="Search" />
                <MdNotificationsNone size={24} className="margin-right-16 cursor-pointer" />
                <div className="cursor-pointer overflow-hidden flex-center" style={{ borderRadius: '100%', height: '36px', width: '36px', backgroundColor: '#fff' }} >
                    <img src={this.props.profile_image ? this.props.profile_image : defaultImage} style={{ height: '36px' }}/>
                </div>
            </div>
        );
    };
};

Search.propTypes = {
    profile_image: PropTypes.string
};

const mapStateToProps = state => ({
    profile_image: state.profile_image,
});


export default connect(mapStateToProps)(Search);