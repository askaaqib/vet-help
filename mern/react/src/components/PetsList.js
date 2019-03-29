// Home.js

import React, { Component } from 'react';
// import gravatar from 'gravatar';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllPets, setSelectedPet } from '../actions/petprofile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

class PetsList extends Component {

	constructor() {
		super();
		this.state = {
			selectedPet: ''
		}
		
	}
   
	componentDidMount() {
		if(!this.props.auth.isAuthenticated) {
			this.props.history.push('/login');
		} else {
			this.props.getAllPets(this.props.auth.user.id, this.props.history);
		}
		this.ChatVet = this.ChatVet.bind(this);
	}

	ChatVet(pet) {
		this.props.setSelectedPet(pet, this.props.history)
		this.props.history.push('/petregister')
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
							<div className="col-md-7 desc-block">
								<div className="pet-name"><b>Name: </b>{ pet.name }</div>
								<div className="pet-breed"><b>Breed: </b> { pet.breed }</div>
								<div className="pet-age"><b>Age: </b> { pet.age }</div>
								<Link to={'/pet/' + pet._id} className="pet-edit"><FontAwesomeIcon icon={faPen} /></Link>
							</div>
							<div className="col-md-3 actions-block text-right">
								<button onClick={ () => props.onClick(pet) } className="btn btn-primary btn-md">Chat With Vet</button>
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
						<div className="card-header petlist-head">
							<label>Pets List</label>
							<Link to="/createprofile" className="btn btn-primary">Add New Pet</Link>
						</div>
						<div className="card-body">
							<div className="container">
								<div className="row">
									<PetsList onClick={ this.ChatVet.bind(this) } petsList={ pets.petsList }/>
								</div>
								{/* {checkList.length > 0 &&  checkList.map((value, index) => {
									return (<div className="ml-0 pl-0 col-md-6 desc-block">
									<span><b>Name: </b>{ value.name }</span>
									<br/>
									<span><b>Breed: </b> { value.breed }</span>
									<br/>
									<span><b>Age: </b> { value.age }</span>
								</div>)
								})} */}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

PetsList.propTypes = {
	getAllPets: PropTypes.func.isRequired,
	setSelectedPet: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	pets: PropTypes.object
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    pets: state.pets,
})

export  default connect(mapStateToProps, { getAllPets, setSelectedPet })(PetsList)