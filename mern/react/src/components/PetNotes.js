import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllPetNotes } from '../actions/petprofile';
//import '../'

class PetNotes extends Component {
	constructor(props) {
		super(props);
			this.state = {
				errors: {}
			}
	}

	componentDidMount() {
		if(!this.props.auth.isAuthenticated) {
			this.props.history.push('/login')
    }
    const { match: { params } } = this.props;
		this.props.getAllPetNotes(params.id)
	}

	componentWillReceiveProps(nextProps) {}

	render() {
		console.log(this.props)
		const { petNotes } = this.props.pets
		function NotesList(props) {
			const list = props.petNotes;
			if (list && list.length > 0) {
				const listPets = list.map((pet, index) =>
						<li key={ index } className="row">
						{ pet.notes &&
							(
								<p>{ pet.notes }</p>
							)
						}
						</li>
				);
				return (
					<ul className="col-md-12 notes-list">{listPets}</ul>
				);
			} else {
				return (
					<ul>No Pets List Found</ul>
				)
			}
		}
		return (
			<div className="main-dasboard pet-edit">
				<div className="container mt-5">
					<div className="card dash-main-card">
						<div className="card-header">
							<label>Case Notes</label>
						</div>
						<div className="card-body">
							<NotesList petNotes= { petNotes }></NotesList>
						</div>
					</div>
				</div>
			</div>

		)
	}
}
 
PetNotes.propTypes = {
	getAllPetNotes: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  pets: PropTypes.object
}

const mapStateToProps = (state) => ({
	auth: state.auth,
  errors: state.errors,
  pets: state.pets,
})

export default connect(mapStateToProps, { getAllPetNotes })(PetNotes)

