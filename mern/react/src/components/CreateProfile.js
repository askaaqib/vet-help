import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import '../'

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

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
                            <label>Create Pet Profile</label>
                        </div>
                        <div className="card-body">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <form>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                <label for="inputEmail4">Email</label>
                                                <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
                                                </div>
                                                <div className="form-group col-md-6">
                                                <label for="inputPassword4">Password</label>
                                                <input type="password" className="form-control" id="inputPassword4" placeholder="Password" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label for="inputAddress">Address</label>
                                                <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
                                            </div>
                                            <div className="form-group">
                                                <label for="inputAddress2">Address 2</label>
                                                <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                <label for="inputCity">City</label>
                                                <input type="text" className="form-control" id="inputCity" />
                                                </div>
                                                <div className="form-group col-md-4">
                                                <label for="inputState">State</label>
                                                <select id="inputState" className="form-control">
                                                    <option selected>Choose...</option>
                                                    <option>...</option>
                                                </select>
                                                </div>
                                                <div className="form-group col-md-2">
                                                <label for="inputZip">Zip</label>
                                                <input type="text" className="form-control" id="inputZip" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="gridCheck" />
                                                <label className="form-check-label" for="gridCheck">
                                                    Check me out
                                                </label>
                                                </div>
                                            </div>
                                            <button type="submit" className="btn btn-primary">Sign in</button>
                                        </form>
                                    </div>
                                    <div className="col">
                                        
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
 
CreateProfile.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    auth: state.auth,
})

export  default connect(mapStateToProps)(CreateProfile)

