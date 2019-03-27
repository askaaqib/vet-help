// Navbar.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authentication';
import { withRouter } from 'react-router-dom'
import logo from '../img/vetpal-logo.png'

class Navbar extends Component {
    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history)
    }

    render() {

        const { isAuthenticated, user } = this.props.auth

        const authLinks = (
            <ul className="navbar ml-auto">
                <Link style={{ color: "#fff" }} to="/dashboard" className="nav-link">Dashboard</Link>
                <Link style={{ color: "#fff" }} to="/createprofile" className="nav-link">Create Profile</Link>
                <Link style={{ color: "#fff" }} to="/requesthelp" className="nav-link">Request Help</Link>
                <Link style={{ color: "#fff" }} to="#" className="nav-link" onClick={this.onLogout.bind(this)}>
                <img src={user.avatar} alt={user.name} title={user.name}
                        className="rounded-circle"
                        style={{ width: '25px', marginRight: '5px'}} />
                            Logout
                </Link>
            </ul>
        )
        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Sign In</Link>
                </li>
            </ul>
          )
        return(
            <nav className="navbar navbar-expand-lg nav-light-bg header-bg">
                <Link className="navbar-brand" to="/">
                { console.log(logo)}
                    <img src={ logo } alt="Vet Pal" className="logo-width" />
                </Link>
                <div className="callapse navbar-collapse" id="navbarSupportedContent">
                    { isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        )
    }
}

PropTypes.Navbar = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));