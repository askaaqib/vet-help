// Home.js

import React, { Component } from 'react';
// import gravatar from 'gravatar';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { setSelectedPet, registerPetChat } from '../actions/petprofile';

class PetRegister extends Component {
  
  constructor() {
    super();
    this.state = {
        problem: '',
        problem_duration: '',
        eating: '',
        weight: '',
        errors: {},
        showStepOne: true,
        showStepTwo: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clickStepOne = this.clickStepOne.bind(this);
    this.completeRegistration = this.completeRegistration.bind(this);
    this.backStep = this.backStep.bind(this);
    this.backToList = this.backToList.bind(this);
}

	componentDidMount() {
		if(!this.props.auth.isAuthenticated) {
			this.props.history.push('/login');
    }
    if(!this.props.pets.selectedPet) {
			this.props.history.push('/pets');
    }
	}

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  clickStepOne(e) {
    this.setState({
      showStepOne: false,
      showStepTwo: true
    })
  }
  backStep() {
    this.setState({
      showStepTwo: false,
      showStepOne: true
    })
  }

  backToList() {
    this.props.history.push('/pets')
    this.props.setSelectedPet(null, this.props.history)
  }
  completeRegistration(e) {
    var petId = this.props.pets.selectedPet._id
    var form = new FormData();
		form.append("problem", this.state.problem);
		form.append("problem_duration", this.state.problem_duration);
		form.append("eating", this.state.eating);
    form.append("weight", this.state.weight);
    form.append("pet", petId);
    this.props.registerPetChat(form, this.props.history);
  }

	render() {
    const { showStepOne } = this.state
    const { showStepTwo } = this.state
    const { selectedPet } = this.props.pets
		return (
			<div className="main-dasboard">
				<div className="container mt-5 pet-register">
          {/******* /////// STEP 1 ///////  ******/}
          { showStepOne  && selectedPet &&
            <div className="step-1">
              <div className="card dash-main-card">
                <div className="card-header">
                  <button onClick={ this.backToList } className="back">
                    <FontAwesomeIcon icon={ faArrowLeft } />
                  </button>
                  <h5 className="step-title">Step 1 of 2</h5>
                </div>
                <div className="card-body">
                  <div className="container">
                    <div className="row form-group">
                      <h4>What's Wrong with { selectedPet.name } Today?</h4>
                      <input type="text" className="form-control" name="problem" onChange={ this.handleInputChange } />
                    </div>
                    <div className="row form-group">
                      <h4>How long { selectedPet.name } has this problem?</h4>
                      <input type="text" className="form-control" name="problem_duration" onChange={ this.handleInputChange } />
                    </div>
                    <div className="row form-group">
                      <h4>{ selectedPet.name } has been eating (including all medication and supplements):</h4>
                      <input type="text" className="form-control" name="eating" onChange={ this.handleInputChange } />
                    </div>
                    <div className="row form-group">
                      <h4>{ selectedPet.name }'s Weight (Good to input)</h4>
                      <div className="input-group mb-3">
                      <input type="number" className="form-control" name="weight" onChange={ this.handleInputChange }/>
                        <div className="input-group-append">
                          <span className="input-group-text">KG</span>
                        </div>
                      </div>
                    </div>
                    <div className="row form-group">
                      <button onClick={ this.clickStepOne } className="btn btn-primary btn-next">
                        <FontAwesomeIcon icon={ faArrowRight } />
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          {/******* /////// STEP 2 ///////  ******/}
          { showStepTwo  &&
            <div className="step-2">
              <div className="card dash-main-card">
                <div className="card-header">
                  <button onClick={ this.backStep } className="back">
                    <FontAwesomeIcon icon={ faArrowLeft } />
                  </button>
                  <h5 className="step-title">Step 2 of 2</h5>
                </div>
                <div className="card-body">
                  <div className="container">
                    <h3>Upload Files</h3>
                    <div className="row form-group">
                      <button onClick={ this.completeRegistration } className="btn btn-primary btn-next">
                        <h5><b>Complete Registration</b></h5>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
				</div>
			</div>
		);
	}
}

PetRegister.propTypes = {
  setSelectedPet: PropTypes.func,
	auth: PropTypes.object.isRequired,
  pets: PropTypes.object,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    pets: state.pets
})

export  default connect(mapStateToProps, { setSelectedPet, registerPetChat })(PetRegister)