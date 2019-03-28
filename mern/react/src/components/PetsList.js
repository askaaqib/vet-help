// Home.js

import React, { Component } from 'react';
// import gravatar from 'gravatar';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllPets } from '../actions/petprofile';

class Home extends Component {
   
	componentDidMount() {
		if(!this.props.auth.isAuthenticated) {
			this.props.history.push('/login');
		}
		this.props.getAllPets(this.props.history);
	}

	
	render() {
		const { pets } = this.props
		function PetsList(props) {
			const list = props.petsList;
			if (list.length > 0) {
				const listPets = list.map((pet, index) =>
					<div key={index}>
						<div className="row list-row">
							<div className="col-md-2 img-block">
								<img src="/images/puppy.jpg" alt="d"></img>
							</div>
							<div className="ml-0 pl-0 col-md-6 desc-block">
								<span><b>Name: </b>{ pet.name }</span>
								<br/>
								<span><b>Breed: </b> { pet.breed }</span>
								<br/>
								<span><b>Age: </b> { pet.age }</span>
							</div>
						</div>
					</div>
				);
				return (
					<div className="col-md-12 pets-list">{listPets}</div>
				);
			} else {
				return (
					<ul>No Pets List Found</ul>
				)
			}
		}
		const checkList = pets.petsList;
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
								<div className="row">
									<PetsList petsList={ pets.petsList }/>
								</div>
								{checkList.length > 0 &&  checkList.map((value, index) => {
									return (<div className="ml-0 pl-0 col-md-6 desc-block">
									<span><b>Name: </b>{ value.name }</span>
									<br/>
									<span><b>Breed: </b> { value.breed }</span>
									<br/>
									<span><b>Age: </b> { value.age }</span>
								</div>)
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

Home.propTypes = {
	getAllPets: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	pets: PropTypes.object
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    pets: state.pets,
})

export  default connect(mapStateToProps, { getAllPets })(Home)