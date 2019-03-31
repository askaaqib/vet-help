// Home.js
import React, { Component } from 'react';
// import gravatar from 'gravatar';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllPets, setSelectedPet, deleteSelectedPet } from '../actions/petprofile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'

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
		this.deletePet = this.deletePet.bind(this);
	}

	ChatVet(pet) {
		this.props.setSelectedPet(pet, this.props.history)
		this.props.history.push('/petregister')
	}

	deletePet(pet) {
		Swal.fire({
			title: 'Delete ' + pet.name,
			text: "You won't be able to revert this!",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
			if (result.value) {
				var form = new FormData();
				form.append('id', pet._id);
				form.append('image', pet.image);
				this.props.deleteSelectedPet(form, this.props.history)
				/********** GET PETS LIST **********/
				this.props.getAllPets(this.props.auth.user.id, this.props.history)
			}
		})
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
								{ pet.image ? (
									<img src={'/images/pets/' + pet.image} alt={ pet.name + ' Image'}></img>
								) : (
									<img src={'/no-img.png'} alt={ pet.name + ' Image'}></img>
								)}
							</div>
							<div className="col-md-7 desc-block">
								<div className="pet-name"><b>Name: </b>{ pet.name }</div>
								<div className="pet-breed"><b>Breed: </b> { pet.breed }</div>
								<div className="pet-age"><b>Age: </b> { pet.age }</div>
								<Link to={'/pet/' + pet._id + '/edit'} className="pet-icons pet-edit"><FontAwesomeIcon icon={ faPen } /></Link>
								<button onClick={ () => props.onDelete(pet) } className="pet-icons pet-delete"><FontAwesomeIcon icon={ faTrash } /></button>
							</div>
							<div className="col-md-3 actions-block text-right">
								<button onClick={ () => props.onChat(pet) } className="btn btn-primary btn-md">Chat With Vet</button>
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
									<PetsList
										onDelete={ this.deletePet.bind(this) }
										onChat={ this.ChatVet.bind(this) }
										petsList={ pets.petsList }
									/>
								</div>
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

export  default connect(mapStateToProps, { getAllPets, setSelectedPet, deleteSelectedPet })(PetsList)