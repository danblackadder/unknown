import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PuffLoader from "react-spinners/PuffLoader";

import { uploadProfileImage, setProfileImage, updateSettings, getSettings } from '../../actions/settings';

import defaultImage from '../../images/default.png';
class Settings extends Component {
    constructor() {
        super();
        this.fileInputRef = React.createRef();
        this.state = {
            loading: false,
            loadingButton: false,
            profilePhotoLoading: false,
            first_name: 'Dan',
            last_name: 'Blackadder',
            email: 'danblackadder@gmail.com',
            old_password: '',
            new_password: '',
            new_password_confirmation: ''
        };
    };

    handleInputChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onFileUpload = (e) => {
        this.setState({
            profilePhotoLoading: true,
        });
        let file = e.target.files[0];

        let formData = new FormData();
        formData.append('file.name', 'test');
        formData.append('file', file);

        this.props.uploadProfileImage(formData)
        .then(() => {
            this.setState({
                profilePhotoLoading: false
            });
        })
        .catch(err => {
            console.log(err);
        });
    };

    onUploadClick = () => {
        this.fileInputRef.current.click();
    }

    handleUpdateSettings = () => {
        this.setState({
            loadingButton: true
        });
        const user = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            old_password: this.state.old_password,
            new_password: this.state.new_password,
            new_password_confirmation: this.state.new_password_confirmation
        };
        this.props.updateSettings(user)
        .then(() => {
            this.setState({
                loadingButton: false
            });
        })
        .catch(err => {
            console.log(err);
        });
    };

    componentDidMount = () => {
        this.setState({
            loading: true,
        }, () => {
            this.props.getSettings()
            .then(() => {
                this.setState({
                    loading: false,
                    first_name: this.props.settings.first_name,
                    last_name: this.props.settings.last_name,
                    email: this.props.settings.email
                });
            })
            .catch(err => {
                console.log(err);
            });
        });
    };

    render() {
        return (
            <>
                {this.state.loading ? (
                    <div className="full-view-height background-primary flex-center padding-16" style={{ border: '16px solid #2B2F33', borderRadius: '20px' }}>
                        <PuffLoader
                            color={'#fff'} />
                    </div>
                ) : (
                        <div className="flex-column padding-16 flex-wrap">
                            <form className="flex-row">
                                <div className="flex-center flex-column background-secondary padding-32 border-radius-8">
                                    <div className="cursor-pointer overflow-hidden flex-center background-neutral" style={{ borderRadius: '100%', height: '150px', width: '150px' }} onClick={() => this.onUploadClick()}>
                                        { this.state.profilePhotoLoading ? (
                                            <PuffLoader color={'#fff'} />
                                        ) : ( 
                                            <img src={this.props.profile_image ? `${this.props.profile_image}?v=${Date.now()}` : defaultImage} style={{ height: '150px' }}/>
                                        )}
                                    </div>
                                    <input ref={this.fileInputRef} type='file' accept="image/png, image/jpeg" onChange={(e) => this.onFileUpload(e)} style={{display: 'none'}}/> 
                                    <button type="file" className="cursor-pointer margin-top-16 border-solid-highlight-1 background-transparent padding-vertical-8 padding-horizontal-32" onClick={() => this.onUploadClick()}>
                                        Upload
                                    </button>
                                </div>
                                    <div className="flex-row background-secondary padding-32 border-radius-8 margin-left-32 flex-1 align-items-center">
                                        <div className="flex-column margin-left-64 flex-1">
                                            <div className="flex-row align-items-center margin-bottom-16">
                                                <p className="font-size-16 margin-right-8 width-100">First Name:</p>
                                                <input type='text' name="first_name" value={this.state.first_name} className="padding-8 border-radius-4 font-size-16 width-300" onChange={(e) => this.handleInputChange(e)}/>
                                            </div>
                                            <div className="flex-row align-items-center margin-bottom-16">
                                                <p className="font-size-16 margin-right-8 width-100">Last Name:</p>
                                                <input type='text' name="last_name" value={this.state.last_name} className="padding-8 border-radius-4 font-size-16 width-300" onChange={(e) => this.handleInputChange(e)}/>
                                            </div>
                                            <div className="flex-row align-items-center margin-bottom-16">
                                                <p className="font-size-16 margin-right-8 width-100">Email:</p>
                                                <input type='email' name="email" value={this.state.email} className="padding-8 border-radius-4 font-size-16 width-300" autoComplete="username" onChange={(e) => this.handleInputChange(e)}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-row background-secondary padding-32 border-radius-8 margin-left-32 flex-1 align-items-center">
                                        <div className="flex-column margin-left-64 flex-1">
                                            <div className="flex-row align-items-center margin-bottom-16">
                                                <p className="font-size-16 margin-right-8 width-200">Old Password:</p>
                                                <input type='password' name="old_password" value={this.state.old_password} className="padding-8 border-radius-4 font-size-16 width-300" autoComplete="current-password" onChange={(e) => this.handleInputChange(e)}/>
                                            </div>
                                            <div className="flex-row align-items-center margin-bottom-16">
                                                <p className="font-size-16 margin-right-8 width-200">New Password:</p>
                                                <input type='password' name="new_password" value={this.state.new_password} className="padding-8 border-radius-4 font-size-16 width-300" autoComplete="new-pasword" onChange={(e) => this.handleInputChange(e)}/>
                                            </div>                                    
                                            <div className="flex-row align-items-center margin-bottom-16">
                                                <p className="font-size-16 margin-right-8 width-200">Confirm New Password:</p>
                                                <input type='password' name="new_password_confirmation" value={this.state.new_password_confirmation} autoComplete="new-pasword" className="padding-8 border-radius-4 font-size-16 width-300" onChange={(e) => this.handleInputChange(e)}/>
                                            </div>
                                        </div>
                                    </div>
                            </form>
                            <button className="cursor-pointer margin-top-16 border-solid-highlight-1 background-transparent padding-vertical-8 padding-horizontal-32 flex-center" onClick={() => this.handleUpdateSettings()}>{this.state.loadingButton ? <PuffLoader size={12} color={'#111'} /> : 'Save' }</button>
                        </div>
                    )}
            </>
        );
    };
};

Settings.propTypes = {
    uploadProfileImage: PropTypes.func.isRequired,
    getSettings: PropTypes.func.isRequired,
    setProfileImage: PropTypes.func.isRequired,
    updateSettings: PropTypes.func.isRequired,
    profile_image: PropTypes.string,
    settings: PropTypes.object
};

const mapStateToProps = state => ({
    profile_image: state.profile_image,
    settings: state.settings,
});

const mapDispatchToProps = {
    uploadProfileImage,
    setProfileImage,
    getSettings,
    updateSettings
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);