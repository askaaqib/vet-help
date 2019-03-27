import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPetProfile } from '../actions/petprofile';
import classnames from 'classnames';
//import '../'
import { Link } from 'react-router-dom';

class CreateProfile extends Component {
	constructor(props) {
		super(props);
			this.state = {
				name: '',
				breed: '',
				age: '',
				type: '',
				image: '',
				errors: {}
			}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.addProfile = this.addProfile.bind(this)
	}

	componentDidMount() {
		if(!this.props.auth.isAuthenticated) {
			this.props.history.push('/login')
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.errors) {
				this.setState({
						errors: nextProps.errors
				});
		}
	}

	handleInputChange(e) {
		if (e.target.files) {
			this.setState({
				[e.target.name]: e.target.files[0]
			})	
		} else {
			this.setState({
				[e.target.name]: e.target.value
			})	
		}
	}

	addProfile(e) {
		e.preventDefault()
		var form = new FormData();
		form.append("name", this.state.name);
		form.append("breed", this.state.breed);
		form.append("age", this.state.age);
		form.append("type", this.state.type);
		form.append("image", this.state.image);
		this.props.createPetProfile(form, this.props.history);
	}
		
	render() { 
		const { errors } = this.state;
		return ( 
			<div className="main-dasboard">
				<div className="container mt-5">
					<div className="card dash-main-card">
						<div className="card-header">
							<label>Create Pet Profile</label>
						</div>
						<div className="card-body">
							<div className="container">
								<div className="row">
									<div className="col">
										<form>
											<div className="form-group col-md-6">
												<label>Pet Name</label>
												<input
													type="text"
													id="name"
													name="name"
													placeholder="Pet Name"
													defaultValue={ this.state.name }
													onChange={ this.handleInputChange }
													className={ classnames('form-control', {'is-invalid': errors.name})}
												/>
												{ errors.name && (<div className="invalid-feedback">{errors.name}</div>) }
											</div>
											<div className="form-group col-md-6">
												<label>Pet Type</label>
													<select
														id="type"
														defaultValue="0"
														name="type"
														onChange={ this.handleInputChange }
														className={ classnames('form-control', {'is-invalid': errors.type})}
													>
														<option value="0">Pet Type</option>
														<option value="dog">Dog</option>
													</select>
													{ errors.name && (<div className="invalid-feedback">{errors.type}</div>) }
											</div>
											<div className="form-group col-md-6">
												<label>Pet Breed</label>
												<input
													type="text"
													className={ classnames('form-control', {'is-invalid': errors.breed})}
													id="breed"
													name="breed"
													placeholder="Pet Breed"
													defaultValue={ this.state.breed }
													onChange={ this.handleInputChange }
												/>
												{ errors.name && (<div className="invalid-feedback">{errors.breed}</div>) }
											</div>
											<div className="form-group col-md-6">
												<label>Age</label>
												<input
													type="text"
													id="age"
													name="age"
													placeholder="Age"
													defaultValue={ this.state.age }
													onChange={ this.handleInputChange }
													className={ classnames('form-control', {'is-invalid': errors.age})}
													/>
													{ errors.name && (<div className="invalid-feedback">{errors.age}</div>) }
											</div>
											<div className="form-group col-md-6">
												<input
													type="file"
													name="image"
													onChange={ this.handleInputChange } 
												/>
											</div>
											<Link to="/dashboard" className="btn btn-primary mr-2">Back</Link>
											<button onClick={ this.addProfile }className="btn btn-primary">Add</button>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		)
	}
}
 
CreateProfile.propTypes = {
	createPetProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	errors: state.errors
})

export default connect(mapStateToProps, { createPetProfile })(CreateProfile)

