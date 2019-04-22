import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PetsList from './PetsList'

class  UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 	<div className="main-dasboard">
    <div className="container mt-5">
      <div className="card dash-main-card">
        <div className="card-header petlist-head">
          <label>Dashboard</label>
  		    <Link to="/createprofile" className="btn login-btn-primary ml-2">Add New Pet</Link>
        </div>
        <div className="card-body">
          <div className="container">
            <div className="row">
              <PetsList></PetsList>
              {/* <div className="card col-xs-12 col-lg-3 dash_card m-1">
                <img className="card-img-top" src={avatar} alt="Card image"
                style={{ width: '100%'}} />
                <div className="card-body">
                  <h4 className="card-title">Create Pet Profile</h4>
                  <p className="card-text">Some example text some example text. John Doe is an architect and engineer</p>
                  <Link to="/createprofile" className="btn btn-primary btn_dashboard">Add New Pet</Link>
                </div>
              </div>
              <div className="card col-xs-12 col-lg-3 dash_card m-1">
                <img className="card-img-top" src={avatar} alt="Card image"
                style={{ width: '100%'}} />
                <div className="card-body">
                  <h4 className="card-title">View All Pets</h4>
                  <p className="card-text">Some example text some example text. John Doe is an architect and engineer</p>
                  <Link to="/pets" className="btn btn-primary btn_dashboard">View All Pets</Link>
                </div>
              </div>
              <div className="card col-xs-12 col-lg-3 dash_card m-1">
                <div className="card-body">
                  <h5 className="card-title">Connect Consultant</h5>
                  <p className="card-text">Some example text some example text. John Doe is an architect and engineer</p>
                  <Link to="#" className="btn btn-primary btn_dashboard">Create Profile</Link>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
   );
  }
}
 
export default UserHome;