// Home.js

import React, { Component } from 'react';
// import gravatar from 'gravatar';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Home extends Component {
    
    componentDidMount() {
        if(!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        }
    }
    
    render() {
        return (
            <div className="main-dasboard">
                <div className="container mt-5">
                    <div className="card dash-main-card">
                        <div className="card-header">
                            <label>Dashboard</label>
                        </div>
                        <div className="card-body">
                            <div className="container">
                                <div className="row">
                                    <div className="card col-xs-12 col-lg-3 dash_card m-1">
                                        {/* <img className="card-img-top" src={avatar} alt="Card image"
                                        style={{ width: '100%'}} /> */}
                                        <div className="card-body">
                                        <h4 className="card-title">Create Pet Profile</h4>
                                        <p className="card-text">Some example text some example text. John Doe is an architect and engineer</p>
                                        <Link to="/createprofile" className="btn btn-primary btn_dashboard">Create Profile</Link>
                                        </div>
                                    </div>
                                    <div className="card col-xs-12 col-lg-3 dash_card m-1">
                                        {/* <img className="card-img-top" src={avatar} alt="Card image"
                                        style={{ width: '100%'}} /> */}
                                        <div className="card-body">
                                        <h4 className="card-title">Create Pet Profile</h4>
                                        <p className="card-text">Some example text some example text. John Doe is an architect and engineer</p>
                                        <Link to="#" className="btn btn-primary btn_dashboard">Create Profile</Link>
                                        </div>
                                    </div>
                                    <div className="card col-xs-12 col-lg-3 dash_card m-1">
                                        {/* <img className="card-img-top" src={avatar} alt="Card image"
                                        style={{ width: '100%'}} /> */}
                                        <div className="card-body">
                                        <h5 className="card-title">Connect Consultant</h5>
                                        <p className="card-text">Some example text some example text. John Doe is an architect and engineer</p>
                                        <Link to="#" className="btn btn-primary btn_dashboard">Create Profile</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export  default connect(mapStateToProps)(Home)