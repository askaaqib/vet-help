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
								<label>Pets List</label>
								<Link to="/createprofile" className="btn btn-primary pull-right">Add New Pet</Link>
						</div>
						<div className="card-body">
							<div className="container">
								<h2>Show All Pets</h2>
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