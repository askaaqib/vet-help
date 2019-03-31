import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SideBar from '../SideBar';
import { getAllUsers } from '../../../actions/admin/user';
import UserListElement from './UserListElement';



class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount() {
		if(!this.props.auth.isAuthenticated && this.props.auth.roles !== 'admin') {
			this.props.history.push('/login');
    }
    
    this.props.getAllUsers()
    
  }

  editUser(id) {
    // console.log(id, 'hi')
  }

  deleteUser(id) {
    // console.log(id, 'hiiii')
  }
  
  render() { 
    console.log(this.props)
    const  { userList, totalpage } = this.props.users;

    return ( 
      <div>
        <div className="d-flex" id="wrapper">
          <SideBar />
          <div id="page-content-wrapper">
            <div className="container-fluid">
              <h1 className="mt-4">User List</h1>
               <div className="">
                <div className=" mt-5">
                  <div className="requests">
                  { userList.length > 0 &&
                    <table className="table table-bordered table-hover bg-white" width="100%">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                  {userList.length > 0 && userList.map((user, index) => {
                    return(
                      <UserListElement 
                        editUser={this.editUser} 
                        deleteUser={this.deleteUser}
                        index={index} 
                        key={index} 
                        user={user} 
                      />
                    )
                      }) 
                  }
                  </tbody>
                  </table>
                  }
                  </div>
                  <div className="card dash-main-card">
                      {
                        totalpage !== null && 

                          <div>
                            {Array.from({ length: totalpage }, (v, k) => <button key={k+1}>{k+1}</button>)}
                           
                          </div>
                        
                      }
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
 
UserList.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  users: state.users,
  auth: state.auth,
  errors: state.errors
})

export  default connect(mapStateToProps, { getAllUsers })(UserList)
